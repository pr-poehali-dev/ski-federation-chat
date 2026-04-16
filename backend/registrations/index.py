import json
import os
import psycopg2  # psycopg2-binary

SCHEMA = "t_p25194708_ski_federation_chat"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Регистрация участников на соревнования и получение списка заявок."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        full_name = body.get("full_name", "").strip()
        birth_date = body.get("birth_date", "").strip()
        region = body.get("region", "").strip()
        team = body.get("team", "").strip()
        rank = body.get("rank", "").strip()
        competition_name = body.get("competition_name", "").strip()
        distance = body.get("distance", "").strip()

        if not all([full_name, birth_date, region, competition_name, distance]):
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Заполните все обязательные поля"}, ensure_ascii=False),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.competition_registrations "
            "(full_name, birth_date, region, team, rank, competition_name, distance) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (full_name, birth_date, region, team or None, rank or None, competition_name, distance),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True, "id": new_id}, ensure_ascii=False),
        }

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, full_name, birth_date, region, team, rank, competition_name, distance, created_at "
            f"FROM {SCHEMA}.competition_registrations ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        registrations = [
            {
                "id": r[0],
                "full_name": r[1],
                "birth_date": r[2].isoformat() if r[2] else None,
                "region": r[3],
                "team": r[4],
                "rank": r[5],
                "competition_name": r[6],
                "distance": r[7],
                "created_at": r[8].isoformat() if r[8] else None,
            }
            for r in rows
        ]

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"registrations": registrations}, ensure_ascii=False),
        }

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}