import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О федерации" },
  { id: "athletes", label: "Спортсмены" },
  { id: "competitions", label: "Соревнования" },
  { id: "results", label: "Результаты" },
  { id: "news", label: "Новости" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

const ATHLETES = [
  {
    id: 1,
    name: "Алексей Воронов",
    rank: "Мастер спорта России",
    age: 28,
    region: "Московская область",
    achievements: ["Чемпион России 2023", "Серебро ЧМ 2022", "Кубок России 2021"],
    stats: { races: 142, podiums: 38, wins: 12 },
    number: "01",
    specialty: "Классика / Свободный стиль",
    emoji: "🥇",
  },
  {
    id: 2,
    name: "Мария Соколова",
    rank: "МС, ЗМС",
    age: 24,
    region: "Тюменская область",
    achievements: ["Олимпийская чемпионка 2022", "3× Чемпион России", "Кубок мира 2023"],
    stats: { races: 98, podiums: 51, wins: 27 },
    number: "07",
    specialty: "Эстафета / Спринт",
    emoji: "⭐",
  },
  {
    id: 3,
    name: "Дмитрий Кузнецов",
    rank: "КМС",
    age: 22,
    region: "Свердловская область",
    achievements: ["Чемпион молодёжного ЧР 2023", "Победитель Спартакиады", "Норматив МС"],
    stats: { races: 67, podiums: 19, wins: 5 },
    number: "14",
    specialty: "Масс-старт / Гонка преследования",
    emoji: "🚀",
  },
  {
    id: 4,
    name: "Екатерина Белова",
    rank: "Мастер спорта России",
    age: 26,
    region: "Красноярский край",
    achievements: ["Финалист Кубка России 2023", "Бронза ЧР 2022", "Победительница этапа КР"],
    stats: { races: 115, podiums: 29, wins: 8 },
    number: "03",
    specialty: "Скиатлон / Классика",
    emoji: "💎",
  },
  {
    id: 5,
    name: "Иван Петров",
    rank: "МС международного класса",
    age: 31,
    region: "Ханты-Мансийск",
    achievements: ["Серебро ЧМ 2021", "4× Кубок России", "Рекордсмен трассы"],
    stats: { races: 203, podiums: 74, wins: 31 },
    number: "99",
    specialty: "Марафон / Классика",
    emoji: "👑",
  },
  {
    id: 6,
    name: "Анна Крылова",
    rank: "КМС",
    age: 20,
    region: "Вологодская область",
    achievements: ["Победитель первенства России", "Надежда сезона 2024", "Стипендиат РФ"],
    stats: { races: 34, podiums: 11, wins: 3 },
    number: "22",
    specialty: "Спринт / Свободный стиль",
    emoji: "🌟",
  },
];

const COMPETITIONS = [
  {
    id: 1,
    name: "Чемпионат России 2025",
    date: "15–20 февраля 2025",
    location: "Ханты-Мансийск",
    type: "Чемпионат",
    distance: "10, 30, 50 км",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Кубок федерации — этап I",
    date: "8–9 декабря 2024",
    location: "Сыктывкар",
    type: "Кубок",
    distance: "5, 10, 15 км",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Зимняя Спартакиада народов России",
    date: "10–18 марта 2025",
    location: "Красноярск",
    type: "Спартакиада",
    distance: "7.5, 15, 30 км",
    status: "upcoming",
  },
  {
    id: 4,
    name: "Кубок России — финал",
    date: "1–5 апреля 2024",
    location: "Мурманск",
    type: "Кубок",
    distance: "10, 50 км",
    status: "past",
  },
  {
    id: 5,
    name: "Первенство России среди юниоров",
    date: "20–25 марта 2024",
    location: "Рыбинск",
    type: "Первенство",
    distance: "5, 10 км",
    status: "past",
  },
];

const RESULTS = [
  { pos: 1, name: "Мария Соколова", time: "25:34.2", diff: "–", region: "Тюменская обл." },
  { pos: 2, name: "Екатерина Белова", time: "25:51.7", diff: "+17.5", region: "Красноярский край" },
  { pos: 3, name: "Анна Крылова", time: "26:02.1", diff: "+27.9", region: "Вологодская обл." },
  { pos: 4, name: "Ольга Нечаева", time: "26:15.4", diff: "+41.2", region: "Московская обл." },
  { pos: 5, name: "Светлана Ветрова", time: "26:23.0", diff: "+48.8", region: "ХМАО" },
];

const NEWS = [
  {
    id: 1,
    title: "Мария Соколова установила новый рекорд трассы на этапе Кубка",
    date: "12 ноября 2024",
    category: "Результаты",
    excerpt: "В воскресенье на трассе Ханты-Мансийска Мария Соколова финишировала с результатом 25:34, улучшив прежний рекорд на 8 секунд.",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Открыта регистрация на Чемпионат России 2025",
    date: "5 ноября 2024",
    category: "Анонс",
    excerpt: "Стартовала регистрация спортсменов на главный старт сезона — Чемпионат России. Соревнования пройдут в феврале в Ханты-Мансийске.",
    icon: "📋",
  },
  {
    id: 3,
    title: "Молодёжный лагерь федерации: итоги осеннего сбора",
    date: "28 октября 2024",
    category: "Подготовка",
    excerpt: "Завершился традиционный осенний сбор молодёжной сборной. 32 спортсмена прошли интенсивный цикл подготовки под руководством тренерского штаба.",
    icon: "⛷️",
  },
  {
    id: 4,
    title: "Иван Петров вошёл в состав национальной сборной на сезон 2024/25",
    date: "20 октября 2024",
    category: "Команда",
    excerpt: "Главный тренер сборной объявил расширенный состав на зимний сезон. В список включены 18 спортсменов из разных регионов страны.",
    icon: "🎿",
  },
];

const GALLERY_ITEMS = [
  { id: 1, emoji: "🏔️", label: "Горная трасса", desc: "Этап Кубка России" },
  { id: 2, emoji: "🌨️", label: "Снежный спринт", desc: "Финиш этапа" },
  { id: 3, emoji: "🏅", label: "Церемония награждения", desc: "ЧР 2024" },
  { id: 4, emoji: "⛷️", label: "Тренировочный лагерь", desc: "Октябрь 2024" },
  { id: 5, emoji: "🌅", label: "Рассвет на трассе", desc: "Утренняя тренировка" },
  { id: 6, emoji: "🎿", label: "Подготовка инвентаря", desc: "Смазочная бригада" },
  { id: 7, emoji: "🏟️", label: "Старт масс-старта", desc: "300 участников" },
  { id: 8, emoji: "🤝", label: "Командный дух", desc: "Эстафета" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<typeof ATHLETES[0] | null>(null);
  const [athleteProfileOpen, setAthleteProfileOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "", age: "", region: "", category: "", specialty: "", bio: ""
  });

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openAthleteProfile = (athlete: typeof ATHLETES[0]) => {
    setSelectedAthlete(athlete);
    setAthleteProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-base text-snow-white font-body overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-base/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
              <div className="w-9 h-9 bg-fire-orange rounded flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">ФЛГ</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-semibold text-sm text-snow-white leading-tight">Федерация лыжных гонок</div>
                <div className="text-muted-foreground text-xs">Российская Федерация</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 text-xs font-display font-medium uppercase tracking-wider transition-colors rounded ${
                    activeSection === link.id
                      ? "text-fire-orange"
                      : "text-muted-foreground hover:text-snow-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setRegisterOpen(true)}
                className="bg-fire-orange hover:bg-orange-600 text-white font-display font-medium text-xs uppercase tracking-wider hidden sm:flex"
              >
                Регистрация спортсмена
              </Button>
              <button
                className="lg:hidden text-muted-foreground hover:text-snow-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-dark-card">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-3 py-2 text-sm font-display uppercase tracking-wider text-muted-foreground hover:text-fire-orange transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                size="sm"
                onClick={() => { setRegisterOpen(true); setMobileMenuOpen(false); }}
                className="mt-2 bg-fire-orange hover:bg-orange-600 text-white font-display text-xs uppercase"
              >
                Регистрация спортсмена
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen hero-bg flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-ice-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-fire-orange/5 blur-3xl" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-fire-orange/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="h-px w-12 bg-fire-orange" />
              <span className="font-display text-fire-orange uppercase tracking-widest text-sm">Официальный сайт</span>
            </div>

            <h1 className="font-display font-bold leading-none mb-6 animate-fade-up stagger-1">
              <span className="block text-5xl sm:text-7xl xl:text-8xl text-snow-white">ФЕДЕРАЦИЯ</span>
              <span className="block text-5xl sm:text-7xl xl:text-8xl text-gradient-fire">ЛЫЖНЫХ</span>
              <span className="block text-5xl sm:text-7xl xl:text-8xl text-gradient-ice">ГОНОК</span>
            </h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-xl animate-fade-up stagger-2 font-body font-light">
              Объединяем лучших спортсменов страны. Организуем соревнования мирового уровня. Развиваем лыжный спорт от массового до олимпийского.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
              <Button
                onClick={() => scrollTo("athletes")}
                className="bg-fire-orange hover:bg-orange-600 text-white font-display uppercase tracking-wider px-8 py-3 h-auto text-sm"
              >
                <Icon name="Users" size={16} className="mr-2" />
                Спортсмены
              </Button>
              <Button
                onClick={() => scrollTo("competitions")}
                variant="outline"
                className="border-ice-blue/50 text-ice-blue hover:bg-ice-blue/10 font-display uppercase tracking-wider px-8 py-3 h-auto text-sm"
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Соревнования
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg animate-fade-up stagger-4">
              {[
                { val: "200+", label: "Спортсменов" },
                { val: "45", label: "Соревнований" },
                { val: "18", label: "Регионов" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-fire-orange pl-4">
                  <div className="font-display font-bold text-3xl text-snow-white">{s.val}</div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-dark-card relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/40 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-fire-orange" />
                <span className="font-display text-fire-orange uppercase tracking-widest text-xs">О федерации</span>
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-6 leading-tight">
                ИСТОРИЯ И<br /><span className="text-gradient-fire">ТРАДИЦИИ</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Федерация лыжных гонок основана в 1948 году и является старейшей спортивной организацией страны в области зимних видов спорта. За 75 лет мы воспитали сотни чемпионов мирового уровня.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Наша миссия — развитие лыжных гонок от детского до олимпийского уровня, обеспечение честных и прозрачных соревнований, поддержка спортсменов на всех этапах карьеры.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Trophy", label: "Чемпионы мира", val: "32" },
                  { icon: "Medal", label: "Олимпийские медали", val: "47" },
                  { icon: "MapPin", label: "Регионов в составе", val: "18" },
                  { icon: "Calendar", label: "Год основания", val: "1948" },
                ].map((item) => (
                  <div key={item.label} className="bg-dark-surface rounded-lg p-4 border border-border card-glow-orange transition-all duration-300">
                    <Icon name={item.icon} size={20} className="text-fire-orange mb-2" />
                    <div className="font-display font-bold text-2xl text-snow-white">{item.val}</div>
                    <div className="text-muted-foreground text-xs mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-dark-surface rounded-xl p-6 border border-border h-40 flex flex-col justify-between stripe-accent">
                    <Icon name="Target" size={28} className="text-fire-orange" />
                    <div>
                      <div className="font-display font-semibold text-snow-white">Миссия</div>
                      <div className="text-muted-foreground text-xs mt-1">Развитие лыжного спорта в стране</div>
                    </div>
                  </div>
                  <div className="bg-fire-orange/10 rounded-xl p-6 border border-fire-orange/20 h-32 flex flex-col justify-between">
                    <Icon name="Zap" size={28} className="text-fire-orange" />
                    <div className="font-display font-bold text-xl text-snow-white">Энергия победы</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-ice-blue/10 rounded-xl p-6 border border-ice-blue/20 h-32 flex flex-col justify-between">
                    <Icon name="Star" size={28} className="text-ice-blue" />
                    <div className="font-display font-bold text-xl text-snow-white">Олимпийский уровень</div>
                  </div>
                  <div className="bg-dark-surface rounded-xl p-6 border border-border h-40 flex flex-col justify-between">
                    <Icon name="Users" size={28} className="text-ice-blue" />
                    <div>
                      <div className="font-display font-semibold text-snow-white">Сообщество</div>
                      <div className="text-muted-foreground text-xs mt-1">200+ спортсменов со всей страны</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATHLETES */}
      <section id="athletes" className="py-24 bg-dark-base relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice-blue/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-ice-blue" />
                <span className="font-display text-ice-blue uppercase tracking-widest text-xs">Наши спортсмены</span>
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white leading-tight">
                ЧЕМПИОНЫ<br /><span className="text-gradient-ice">И РЕКОРДСМЕНЫ</span>
              </h2>
            </div>
            <Button
              onClick={() => setRegisterOpen(true)}
              className="bg-fire-orange hover:bg-orange-600 text-white font-display uppercase tracking-wider text-xs self-start sm:self-end"
            >
              <Icon name="UserPlus" size={14} className="mr-2" />
              Зарегистрироваться
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ATHLETES.map((athlete, i) => (
              <div
                key={athlete.id}
                onClick={() => openAthleteProfile(athlete)}
                className="bg-dark-card border border-border rounded-xl p-6 cursor-pointer card-glow-blue transition-all duration-300 hover:border-ice-blue/40 group relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 font-display font-bold text-5xl text-snow-white/5 group-hover:text-snow-white/10 transition-all">
                  {athlete.number}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-dark-surface border border-border flex items-center justify-center text-2xl flex-shrink-0">
                    {athlete.emoji}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-snow-white group-hover:text-ice-blue transition-colors">
                      {athlete.name}
                    </h3>
                    <div className="text-fire-orange text-xs font-display uppercase tracking-wider mt-0.5">{athlete.rank}</div>
                    <div className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                      <Icon name="MapPin" size={10} />
                      {athlete.region}
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground text-xs mb-4 flex items-center gap-1">
                  <Icon name="Zap" size={12} className="text-ice-blue" />
                  {athlete.specialty}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { val: athlete.stats.races, label: "Стартов" },
                    { val: athlete.stats.podiums, label: "Призов" },
                    { val: athlete.stats.wins, label: "Побед" },
                  ].map((s) => (
                    <div key={s.label} className="bg-dark-surface rounded-lg p-2 text-center">
                      <div className="font-display font-bold text-lg text-snow-white">{s.val}</div>
                      <div className="text-muted-foreground text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {athlete.achievements.slice(0, 2).map((a, ai) => (
                    <div key={ai} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Award" size={10} className="text-fire-orange flex-shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1 text-ice-blue text-xs font-display uppercase tracking-wider group-hover:gap-2 transition-all">
                  Профиль <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPETITIONS */}
      <section id="competitions" className="py-24 bg-dark-card relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/40 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-fire-orange" />
            <span className="font-display text-fire-orange uppercase tracking-widest text-xs">Календарь</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-12 leading-tight">
            СОРЕВНОВАНИЯ<br /><span className="text-gradient-fire">СЕЗОНА 2024/25</span>
          </h2>

          <div className="space-y-4">
            {COMPETITIONS.map((comp, i) => (
              <div
                key={comp.id}
                className={`border rounded-xl p-5 transition-all duration-300 hover:border-fire-orange/40 group relative overflow-hidden ${
                  comp.status === "upcoming"
                    ? "bg-dark-surface border-border card-glow-orange"
                    : "bg-dark-base/50 border-border/50 opacity-70"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-lg flex-shrink-0 ${
                      comp.status === "upcoming" ? "bg-fire-orange text-white" : "bg-dark-surface text-muted-foreground border border-border"
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-snow-white group-hover:text-fire-orange transition-colors text-lg leading-tight">
                        {comp.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Icon name="Calendar" size={10} />
                          {comp.date}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Icon name="MapPin" size={10} />
                          {comp.location}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Icon name="Flag" size={10} />
                          {comp.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge className={
                      comp.type === "Чемпионат" ? "bg-fire-orange/20 text-fire-orange border-fire-orange/30" :
                      comp.type === "Кубок" ? "bg-ice-blue/20 text-ice-blue border-ice-blue/30" :
                      "bg-muted text-muted-foreground"
                    }>
                      {comp.type}
                    </Badge>
                    {comp.status === "upcoming" && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Скоро</Badge>
                    )}
                    {comp.status === "past" && (
                      <Badge className="bg-muted text-muted-foreground">Завершено</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24 bg-dark-base relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice-blue/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-ice-blue" />
            <span className="font-display text-ice-blue uppercase tracking-widest text-xs">Протоколы</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-2 leading-tight">
            ПОСЛЕДНИЕ<br /><span className="text-gradient-ice">РЕЗУЛЬТАТЫ</span>
          </h2>
          <p className="text-muted-foreground mb-10 font-body">Чемпионат России 2024 — Женщины 10 км, свободный стиль</p>

          <div className="bg-dark-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-dark-surface text-muted-foreground text-xs font-display uppercase tracking-wider border-b border-border">
              <div>Место</div>
              <div className="col-span-2">Спортсмен</div>
              <div>Результат</div>
              <div>Отставание</div>
            </div>
            {RESULTS.map((r, i) => (
              <div
                key={r.pos}
                className={`grid grid-cols-5 gap-4 px-6 py-4 border-b border-border/50 last:border-0 transition-colors hover:bg-dark-surface/50 ${
                  i === 0 ? "bg-fire-orange/5" : ""
                }`}
              >
                <div className="flex items-center">
                  {i === 0 ? (
                    <div className="w-8 h-8 rounded-full bg-fire-orange flex items-center justify-center font-display font-bold text-white text-sm">1</div>
                  ) : i === 1 ? (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-display font-bold text-snow-white text-sm">2</div>
                  ) : i === 2 ? (
                    <div className="w-8 h-8 rounded-full bg-amber-800/60 flex items-center justify-center font-display font-bold text-snow-white text-sm">3</div>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center font-display text-muted-foreground text-sm">{r.pos}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="font-display font-medium text-snow-white">{r.name}</div>
                  <div className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                    <Icon name="MapPin" size={10} />
                    {r.region}
                  </div>
                </div>
                <div className="font-display font-semibold text-snow-white flex items-center">{r.time}</div>
                <div className={`flex items-center font-display text-sm ${i === 0 ? "text-fire-orange" : "text-muted-foreground"}`}>
                  {r.diff}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-24 bg-dark-card relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/40 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-fire-orange" />
            <span className="font-display text-fire-orange uppercase tracking-widest text-xs">Актуально</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-12 leading-tight">
            НОВОСТИ<br /><span className="text-gradient-fire">ФЕДЕРАЦИИ</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((item, i) => (
              <div
                key={item.id}
                className={`bg-dark-surface border border-border rounded-xl overflow-hidden card-glow-orange transition-all duration-300 hover:border-fire-orange/30 group cursor-pointer ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className={`p-6 flex flex-col gap-4 ${i === 0 ? "md:flex-row md:items-start md:gap-8" : ""}`}>
                  {i === 0 && (
                    <div className="md:w-56 h-36 bg-dark-base rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
                      <div className="text-center">
                        <div className="text-5xl mb-2">{item.icon}</div>
                        <div className="text-muted-foreground text-xs font-display uppercase tracking-wider">Главная новость</div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {i !== 0 && <span className="text-2xl">{item.icon}</span>}
                      <Badge className="bg-fire-orange/20 text-fire-orange border-fire-orange/30 text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-muted-foreground text-xs">{item.date}</span>
                    </div>
                    <h3 className="font-display font-semibold text-snow-white group-hover:text-fire-orange transition-colors text-lg leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-fire-orange text-xs font-display uppercase tracking-wider group-hover:gap-2 transition-all">
                      Читать далее <Icon name="ArrowRight" size={12} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-dark-base relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ice-blue/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-ice-blue" />
            <span className="font-display text-ice-blue uppercase tracking-widest text-xs">Фотогалерея</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-12 leading-tight">
            ГАЛЕРЕЯ<br /><span className="text-gradient-ice">СОРЕВНОВАНИЙ</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`bg-dark-card border border-border rounded-xl overflow-hidden group cursor-pointer card-glow-blue transition-all duration-300 hover:border-ice-blue/40 ${
                  i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`flex items-center justify-center bg-dark-surface relative overflow-hidden ${
                  i === 0 || i === 5 ? "h-48 md:h-64" : "h-36"
                }`}>
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="font-display font-semibold text-snow-white text-sm">{item.label}</div>
                    <div className="text-muted-foreground text-xs">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-dark-card relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/40 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-fire-orange" />
            <span className="font-display text-fire-orange uppercase tracking-widest text-xs">Связаться с нами</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-snow-white mb-12 leading-tight">
            КОНТАКТЫ<br /><span className="text-gradient-fire">ФЕДЕРАЦИИ</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "Адрес", val: "г. Москва, Лужнецкая набережная, д. 8, оф. 214" },
                { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Электронная почта", val: "info@skirace-federation.ru" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00 – 18:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-fire-orange/10 border border-fire-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fire-orange/20 transition-colors">
                    <Icon name={c.icon} size={18} className="text-fire-orange" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-1">{c.label}</div>
                    <div className="text-snow-white font-body">{c.val}</div>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                {["Вконтакте", "Telegram", "YouTube"].map((soc) => (
                  <div
                    key={soc}
                    className="px-4 py-2 rounded-lg border border-border bg-dark-surface hover:border-fire-orange/40 hover:text-fire-orange transition-all cursor-pointer text-sm font-display text-muted-foreground"
                  >
                    {soc}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-surface rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-xl text-snow-white mb-6">Написать нам</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Ваше имя</Label>
                  <Input className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange" placeholder="Иван Иванов" />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Email</Label>
                  <Input className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange" placeholder="email@mail.ru" type="email" />
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Сообщение</Label>
                  <Textarea className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange min-h-28" placeholder="Ваш вопрос или предложение..." />
                </div>
                <Button className="w-full bg-fire-orange hover:bg-orange-600 text-white font-display uppercase tracking-wider">
                  <Icon name="Send" size={14} className="mr-2" />
                  Отправить сообщение
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-base border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-fire-orange rounded flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">ФЛГ</span>
              </div>
              <span className="font-display text-muted-foreground text-sm">Федерация лыжных гонок России © 2024</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {NAV_LINKS.slice(0, 4).map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-muted-foreground hover:text-fire-orange text-xs font-display uppercase tracking-wider transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ATHLETE PROFILE DIALOG */}
      <Dialog open={athleteProfileOpen} onOpenChange={setAthleteProfileOpen}>
        <DialogContent className="bg-dark-card border-border text-snow-white max-w-lg">
          {selectedAthlete && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-dark-surface border-2 border-fire-orange flex items-center justify-center text-3xl">
                    {selectedAthlete.emoji}
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl text-snow-white">{selectedAthlete.name}</DialogTitle>
                    <div className="text-fire-orange text-sm font-display uppercase tracking-wider">{selectedAthlete.rank}</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: selectedAthlete.stats.races, label: "Стартов" },
                    { val: selectedAthlete.stats.podiums, label: "Призов" },
                    { val: selectedAthlete.stats.wins, label: "Побед" },
                  ].map((s) => (
                    <div key={s.label} className="bg-dark-surface rounded-lg p-3 text-center border border-border">
                      <div className="font-display font-bold text-2xl text-snow-white">{s.val}</div>
                      <div className="text-muted-foreground text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-surface rounded-lg p-3 border border-border">
                    <div className="text-muted-foreground text-xs mb-1 font-display uppercase">Возраст</div>
                    <div className="font-display font-semibold text-snow-white">{selectedAthlete.age} лет</div>
                  </div>
                  <div className="bg-dark-surface rounded-lg p-3 border border-border">
                    <div className="text-muted-foreground text-xs mb-1 font-display uppercase">Регион</div>
                    <div className="font-display font-semibold text-snow-white text-sm">{selectedAthlete.region}</div>
                  </div>
                </div>

                <div className="bg-dark-surface rounded-lg p-3 border border-border">
                  <div className="text-muted-foreground text-xs mb-2 font-display uppercase tracking-wider">Специализация</div>
                  <div className="font-body text-snow-white text-sm flex items-center gap-2">
                    <Icon name="Zap" size={14} className="text-ice-blue" />
                    {selectedAthlete.specialty}
                  </div>
                </div>

                <div className="bg-dark-surface rounded-lg p-3 border border-border">
                  <div className="text-muted-foreground text-xs mb-3 font-display uppercase tracking-wider">Достижения</div>
                  <div className="space-y-2">
                    {selectedAthlete.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-snow-white">
                        <Icon name="Award" size={14} className="text-fire-orange flex-shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-fire-orange hover:bg-orange-600 text-white font-display uppercase text-xs tracking-wider">
                    <Icon name="Share2" size={14} className="mr-2" />
                    Поделиться
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-muted-foreground hover:text-snow-white font-display uppercase text-xs tracking-wider"
                    onClick={() => setAthleteProfileOpen(false)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* REGISTER DIALOG */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="bg-dark-card border-border text-snow-white max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-fire-orange flex items-center justify-center">
                <Icon name="UserPlus" size={18} className="text-white" />
              </div>
              <DialogTitle className="font-display text-2xl text-snow-white">Регистрация спортсмена</DialogTitle>
            </div>
            <p className="text-muted-foreground text-sm">Заполните форму для вступления в реестр федерации</p>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Полное имя *</Label>
              <Input
                className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange"
                placeholder="Фамилия Имя Отчество"
                value={registerForm.name}
                onChange={(e) => setRegisterForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Возраст</Label>
                <Input
                  className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange"
                  placeholder="24"
                  type="number"
                  value={registerForm.age}
                  onChange={(e) => setRegisterForm(f => ({ ...f, age: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Регион</Label>
                <Input
                  className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange"
                  placeholder="Московская обл."
                  value={registerForm.region}
                  onChange={(e) => setRegisterForm(f => ({ ...f, region: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Спортивная категория</Label>
              <Select value={registerForm.category} onValueChange={(v) => setRegisterForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-dark-base border-border text-snow-white">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-border text-snow-white">
                  <SelectItem value="ms">Мастер спорта (МС)</SelectItem>
                  <SelectItem value="msmc">МС международного класса</SelectItem>
                  <SelectItem value="zms">Заслуженный МС (ЗМС)</SelectItem>
                  <SelectItem value="kms">Кандидат в МС (КМС)</SelectItem>
                  <SelectItem value="1">1-й спортивный разряд</SelectItem>
                  <SelectItem value="youth">Юношеский разряд</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">Специализация</Label>
              <Select value={registerForm.specialty} onValueChange={(v) => setRegisterForm(f => ({ ...f, specialty: v }))}>
                <SelectTrigger className="bg-dark-base border-border text-snow-white">
                  <SelectValue placeholder="Выберите специализацию" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-border text-snow-white">
                  <SelectItem value="classic">Классический стиль</SelectItem>
                  <SelectItem value="free">Свободный стиль</SelectItem>
                  <SelectItem value="sprint">Спринт</SelectItem>
                  <SelectItem value="masstart">Масс-старт</SelectItem>
                  <SelectItem value="relay">Эстафета</SelectItem>
                  <SelectItem value="all">Многоборье</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs font-display uppercase tracking-wider mb-2 block">О себе и достижениях</Label>
              <Textarea
                className="bg-dark-base border-border text-snow-white placeholder:text-muted-foreground focus:border-fire-orange min-h-24"
                placeholder="Расскажите о своих спортивных достижениях, тренере, клубе..."
                value={registerForm.bio}
                onChange={(e) => setRegisterForm(f => ({ ...f, bio: e.target.value }))}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-fire-orange hover:bg-orange-600 text-white font-display uppercase tracking-wider"
                onClick={() => {
                  setRegisterOpen(false);
                  setRegisterForm({ name: "", age: "", region: "", category: "", specialty: "", bio: "" });
                }}
              >
                <Icon name="CheckCircle" size={14} className="mr-2" />
                Подать заявку
              </Button>
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-snow-white font-display uppercase text-xs"
                onClick={() => setRegisterOpen(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}