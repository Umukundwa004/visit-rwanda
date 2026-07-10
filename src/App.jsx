import { useState, useEffect, useRef } from "react";

// ─── IMAGES — Unsplash direct (works in real browser) ─────────────────────────
const U = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
const IMAGES = {
  hero:      U("1516026672322-bc52d61a55d5", 1600, 900),  // Rwanda green hills aerial
  gorillas:  U("1590418606746-018840f9ced4", 900,  600),  // Mountain gorilla
  volcanoes: U("1464822759023-fed622ff2c3b", 900,  600),  // Volcanic mountain misty
  canopy:    U("1448375240586-882707db888b", 900,  600),  // Forest canopy treetops
  kivu:      U("1501785888041-af3ef285b470", 900,  600),  // Scenic lake blue water
  akagera:   U("1516426122078-c23e76319801", 900,  600),  // African savanna
  kigali:    U("1486325212027-8081e485255e", 900,  600),  // Modern city skyline
  culture:   U("1531761535209-83f523b9dce3", 900,  600),  // African cultural people
  safari:    U("1547471080-7cc2caa01a7e",   900,  600),  // Safari wildlife drive
  hiking:    U("1551632811-561732d1e306",   900,  600),  // Hiking mountain trail
  birds:     U("1444464666168-49d633b86797", 900,  600),  // Colorful tropical bird
  forest:    U("1502082553048-f009c37129b9", 900,  600),  // Dense rainforest
  elephant:  U("1557050543-4d5f4e07ef46",  900,  600),  // African elephant
  chimp:     U("1603792907191-89e55f70099a", 900,  600),  // Chimpanzee
  dance:     U("1547153760-18114ead3a37",   900,  600),  // African traditional dance
  food:      U("1504674900247-0877df9cc836", 900,  600),  // Grilled food / BBQ
  market:    U("1555939594-58d7cb561ad1",   900,  600),  // Colorful market
  mountain:  U("1519681393784-d120267933ba", 900,  600),  // Mountain peaks snow
  lake2:     U("1505118380757-91f5f5632de0", 900,  600),  // Calm lake reflection
  gishwati:  U("1585409677983-0f6c41ca9c3b", 900,  600),  // Green tropical forest
};

const DESTINATIONS = [
  { id:1, name:"Volcanoes National Park", region:"Northern Rwanda", tag:"Gorilla Trekking",
    desc:"Trek through misty volcanic slopes to encounter mountain gorillas — one of the world's most profound wildlife moments.",
    images:[IMAGES.volcanoes, IMAGES.gorillas, IMAGES.mountain], highlight:"#1A5C3A", duration:"2–5 days",
    sidebar:[{label:"National Parks",title:"Volcanoes NP",img:IMAGES.volcanoes},{label:"Wildlife",title:"Gorilla Trekking",img:IMAGES.gorillas}] },
  { id:2, name:"Nyungwe Forest", region:"Southern Rwanda", tag:"Canopy Walk",
    desc:"Walk 70m above the forest floor on Africa's longest canopy walkway, suspended over an ancient rainforest.",
    images:[IMAGES.canopy, IMAGES.forest, IMAGES.chimp], highlight:"#2D6A4F", duration:"1–3 days",
    sidebar:[{label:"National Parks",title:"Nyungwe National Park",img:IMAGES.canopy},{label:"Adventure",title:"Hiking",img:IMAGES.hiking}] },
  { id:3, name:"Lake Kivu", region:"Western Rwanda", tag:"Lakeside Escape",
    desc:"Pristine beaches, island kayaking, and sunsets that turn the water copper — Africa's most underrated lake.",
    images:[IMAGES.kivu, IMAGES.lake2, IMAGES.mountain], highlight:"#4A9BB8", duration:"2–4 days",
    sidebar:[{label:"Lakes",title:"Lake Kivu",img:IMAGES.kivu},{label:"Adventure",title:"Water Sports",img:IMAGES.lake2}] },
  { id:4, name:"Akagera National Park", region:"Eastern Rwanda", tag:"Big Five Safari",
    desc:"Rwanda's savanna gem — lions, elephants, hippos, and the elusive rhino roam resurgent wetlands and open plains.",
    images:[IMAGES.akagera, IMAGES.elephant, IMAGES.safari], highlight:"#C8860A", duration:"2–3 days",
    sidebar:[{label:"National Parks",title:"Akagera NP",img:IMAGES.akagera},{label:"Wildlife",title:"Safari Drives",img:IMAGES.elephant}] },
  { id:5, name:"Kigali City", region:"Central Rwanda", tag:"Urban Wonder",
    desc:"Africa's cleanest, safest capital — a vibrant mosaic of hilltop cafés, world-class museums, and electric nightlife.",
    images:[IMAGES.kigali, IMAGES.market, IMAGES.culture], highlight:"#8B6914", duration:"1–2 days",
    sidebar:[{label:"City",title:"Kigali",img:IMAGES.kigali},{label:"Culture",title:"Arts & Markets",img:IMAGES.market}] },
  { id:6, name:"Gishwati-Mukura", region:"Western Rwanda", tag:"Hidden Gem",
    desc:"Rwanda's newest national park — chimpanzee tracking and golden monkeys in a recovering ancient rainforest.",
    images:[IMAGES.gishwati, IMAGES.chimp, IMAGES.forest], highlight:"#4A7C59", duration:"1–2 days",
    sidebar:[{label:"National Parks",title:"Gishwati Forest",img:IMAGES.gishwati},{label:"Wildlife",title:"Chimpanzees",img:IMAGES.chimp}] },
];

const WILDLIFE = [
  { name:"Mountain Gorillas", count:"~1,063 left worldwide", desc:"Half the world's remaining mountain gorillas call Rwanda home. A one-hour permit trek changes lives.", img:IMAGES.gorillas, color:"#1A5C3A" },
  { name:"African Lions",     count:"Akagera pride",         desc:"Reintroduced in 2015, Rwanda's lions now roam free across Akagera's golden grasslands.", img:IMAGES.safari,   color:"#C8860A" },
  { name:"Forest Elephants",  count:"200+ in Akagera",       desc:"Gentle giants by the wetlands — dawn game drives reveal herds crossing ancient corridors.", img:IMAGES.elephant, color:"#8B3A2A" },
  { name:"Rare Birds",        count:"700+ species",           desc:"Over 700 bird species inhabit Rwanda — birders travel continents to see the elusive shoebill.", img:IMAGES.birds,    color:"#4A9BB8" },
  { name:"Chimpanzees",       count:"Nyungwe troops",         desc:"Track habituated chimps through ancient rainforest — their laughter echoes through 1,000-year-old trees.", img:IMAGES.chimp,    color:"#2D6A4F" },
  { name:"Canopy Life",       count:"Ancient rainforest",     desc:"Nyungwe's canopy teems with primates, orchids, and birdsong from a forest older than written history.", img:IMAGES.forest,   color:"#F0A830" },
];

const FOODS = [
  { name:"Brochettes",    desc:"Skewered goat or beef, chargrilled over open flame — served at every corner of Kigali.", img:IMAGES.food },
  { name:"Market Fresh",  desc:"Rwanda's vibrant markets overflow with avocados, passion fruit, and fresh-picked vegetables.", img:IMAGES.market },
  { name:"Forest Harvest",desc:"Cassava leaves, banana groves and sorghum — ingredients pulled straight from Rwanda's fertile hills.", img:IMAGES.forest },
];

const ITINERARIES = [
  { title:"3-Day Kigali Explorer",  price:"From $890",   tag:"City & Culture", color:"#C8860A", img:IMAGES.kigali,
    days:[{day:"Day 1",act:"Kigali Genocide Memorial → Kimironko Market → Rooftop sunset dinner"},{day:"Day 2",act:"Inema Arts Centre → Nyamirambo Walking Tour → Jazz evening"},{day:"Day 3",act:"Presidential Palace Museum → Departure lounge"}] },
  { title:"7-Day Rwanda Safari",    price:"From $3,200", tag:"Full Immersion", color:"#1A5C3A", img:IMAGES.akagera,
    days:[{day:"Days 1–2",act:"Kigali arrival → Akagera safari drives"},{day:"Days 3–4",act:"Gorilla trekking → Volcanoes National Park"},{day:"Days 5–6",act:"Nyungwe canopy walk → Lake Kivu"},{day:"Day 7",act:"Kigali city tour → Departure"}] },
  { title:"5-Day Nature Deep Dive", price:"From $1,950", tag:"Wildlife Focus", color:"#4A9BB8", img:IMAGES.canopy,
    days:[{day:"Day 1",act:"Nyungwe arrival → Forest lodge"},{day:"Days 2–3",act:"Chimp tracking → Canopy walk → Bird watching"},{day:"Day 4",act:"Lake Kivu boat cruise → Gisenyi beach"},{day:"Day 5",act:"Kigali city → Departure"}] },
];

// ─── IMAGE CAROUSEL ───────────────────────────────────────────────────────────
function ImageCarousel({ images, height }) {
  const [idx, setIdx] = useState(0);
  const h = height || "h-96";
  return (
    <div className={"relative " + h + " rounded-2xl overflow-hidden group bg-gray-800"}>
      {images.map((src, i) => (
        <img key={i} src={src} alt=""
          className={"absolute inset-0 w-full h-full object-cover transition-opacity duration-700 " + (i === idx ? "opacity-100" : "opacity-0")} />
      ))}
      <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition opacity-0 group-hover:opacity-100 text-xl font-bold z-10">
        &#8249;
      </button>
      <button onClick={() => setIdx(i => (i + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition opacity-0 group-hover:opacity-100 text-xl font-bold z-10">
        &#8250;
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={"h-1.5 rounded-full transition-all " + (i === idx ? "bg-white w-4" : "bg-white/50 w-1.5")} />
        ))}
      </div>
    </div>
  );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setP((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div className="h-full bg-gradient-to-r from-[#C8860A] via-[#F0A830] to-[#1A5C3A] transition-all duration-100"
        style={{ width: p + "%" }} />
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label:"Home", key:"Home" },
    { label:"Destinations", key:"Destinations" },
    { label:"Wildlife", key:"Wildlife" },
    { label:"Culture", key:"Culture" },
    { label:"Plan Trip", key:"Plan" },
  ];
  return (
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 " +
      (scrolled ? "py-2 bg-[#06111A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-5 bg-transparent")}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => setPage("Home")} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C8860A]">
            <img src={IMAGES.volcanoes} alt="Rwanda" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">
            Visit <span className="text-[#F0A830]">Rwanda</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)}
              className={"px-4 py-2 rounded-full text-sm font-medium transition-all " +
                (page === l.key ? "bg-[#C8860A] text-white" : "text-white/80 hover:text-white hover:bg-white/10")}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:block bg-[#C8860A] hover:bg-[#F0A830] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg">
            Book Now
          </button>
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#06111A]/98 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {links.map(l => (
            <button key={l.key} onClick={() => { setPage(l.key); setMenuOpen(false); }}
              className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-left transition">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FLOATING BUTTON ──────────────────────────────────────────────────────────
function FloatingBtn({ setPage }) {
  return (
    <button onClick={() => setPage("Plan")}
      className="fixed bottom-6 right-6 z-50 bg-[#C8860A] hover:bg-[#F0A830] text-white px-5 py-3 rounded-full text-sm font-bold shadow-2xl hover:scale-105 transition-all">
      Plan Trip
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
  const [search, setSearch] = useState("");
  const [vidReady, setVidReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const vidRef = useRef(null);

  const suggestions = ["Volcanoes National Park","Lake Kivu","Kigali City","Nyungwe Forest","Akagera Safari"];
  const filtered = search.length > 1 ? suggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())) : [];

  const [ref1, v1] = useScrollReveal();
  const [ref2, v2] = useScrollReveal();
  const [ref3, v3] = useScrollReveal();

  const whyCards = [
    { title:"Safest in Africa",  desc:"Rwanda ranks #1 in personal safety across sub-Saharan Africa.", img:IMAGES.kigali },
    { title:"Pristine Nature",   desc:"30% of Rwanda is protected natural land — volcanoes to rainforests.", img:IMAGES.forest },
    { title:"Living Culture",    desc:"Intore dancers, Imigongo art, and a renaissance rooted in deep history.", img:IMAGES.dance },
    { title:"Rare Wildlife",     desc:"The only place to track mountain gorillas in their natural habitat.", img:IMAGES.gorillas },
  ];

  return (
    <div className="bg-[#06111A]">

      {/* HERO VIDEO */}
      <section className="relative h-screen overflow-hidden">
        {/* Poster image always shown; video fades on top when ready */}
        <img src={IMAGES.hero} alt="Rwanda landscape"
          className="absolute inset-0 w-full h-full object-cover" />

        <video ref={vidRef}
          autoPlay muted={muted} playsInline loop
          onCanPlay={() => setVidReady(true)}
          className={"absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 " + (vidReady ? "opacity-100" : "opacity-0")}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06111A]" />

        {/* Mute button */}
        <button onClick={() => setMuted(m => !m)}
          className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition">
          {muted
            ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" /></svg>
          }
        </button>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-20">
          <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
            East Africa's Most Extraordinary Destination
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
            Discover Rwanda
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-3 font-light tracking-widest uppercase">
            The Land of a Thousand Hills
          </p>
          <p className="text-base text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Ancient volcanoes, emerald rainforests, mountain gorillas, and a capital reborn.
          </p>

          {/* Search */}
          <div className="relative w-full max-w-2xl mx-auto mb-10">
            <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 gap-3">
              <svg className="w-5 h-5 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Where do you want to go in Rwanda?"
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base" />
              <button onClick={() => setPage("Destinations")}
                className="bg-[#C8860A] hover:bg-[#F0A830] text-white px-6 py-2 rounded-xl font-semibold text-sm transition shrink-0">
                Search
              </button>
            </div>
            {filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#06111A]/95 border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl">
                {filtered.map(s => (
                  <button key={s} onClick={() => { setSearch(s); setPage("Destinations"); }}
                    className="w-full text-left px-5 py-3 text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-3 transition text-sm">
                    <svg className="w-4 h-4 text-[#C8860A] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setPage("Destinations")}
              className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition">
              Explore Destinations
            </button>
            <button onClick={() => setPage("Plan")}
              className="bg-[#C8860A] hover:bg-[#F0A830] text-white px-8 py-3.5 rounded-2xl font-semibold transition hover:scale-105 shadow-lg">
              Plan Your Trip
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{v:"1,000+",l:"Hills & Valleys"},{v:"98%",l:"Safety Rating"},{v:"700+",l:"Bird Species"},{v:"500k+",l:"Annual Visitors"}].map(s => (
            <div key={s.l}>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#C8860A] to-[#F0A830] bg-clip-text text-transparent">{s.v}</div>
              <div className="text-white/40 text-sm mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY RWANDA */}
      <section ref={ref1} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={"text-center mb-16 transition-all duration-700 " + (v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <span className="text-[#C8860A] text-xs font-semibold tracking-widest uppercase mb-3 block">Why Rwanda</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">A Country That Surprises</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((c, i) => (
              <div key={c.title}
                className={"group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 " +
                  (v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                style={{ transitionDelay: (i * 120) + "ms" }}>
                <div className="aspect-[3/4] relative bg-gray-800">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-1">{c.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE WORLDS */}
      <section ref={ref2} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={"text-center mb-16 transition-all duration-700 " + (v2 ? "opacity-100" : "opacity-0")}>
            <span className="text-[#C8860A] text-xs font-semibold tracking-widest uppercase mb-3 block">Landscapes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Three Worlds, One Country</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title:"Volcanic Peaks", sub:"Virunga Volcanoes", desc:"Five ancient volcanoes rising to 4,507m — home to gorillas and golden monkeys.", img:IMAGES.volcanoes },
              { title:"Lake Kivu",      sub:"The Western Gem",   desc:"One of Africa's Great Lakes — crystalline blue water flanked by tropical hills.", img:IMAGES.kivu },
              { title:"Kigali Rising",  sub:"The Clean Capital", desc:"A gleaming hilltop capital — spotless, safe, and electric with innovation.", img:IMAGES.kigali },
            ].map((item, i) => (
              <div key={item.title}
                className={"group relative rounded-3xl overflow-hidden transition-all duration-700 " +
                  (v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                style={{ transitionDelay: (i * 150) + "ms" }}>
                <div className="h-80 relative bg-gray-800">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[#F0A830] text-xs tracking-widest uppercase mb-1">{item.sub}</div>
                    <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ref3} className={"py-20 px-4 transition-all duration-700 " + (v3 ? "opacity-100" : "opacity-0")}>
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden bg-gray-800">
          <img src={IMAGES.safari} alt="Rwanda safari" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-12">
            <h2 className="text-4xl font-bold text-white mb-4 max-w-lg">Ready to Experience Rwanda?</h2>
            <p className="text-white/60 mb-8 max-w-md">Join 500,000 travelers who discovered Africa's most remarkable country.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("Plan")} className="bg-[#C8860A] hover:bg-[#F0A830] text-white px-8 py-3.5 rounded-2xl font-bold transition hover:scale-105">Start Planning</button>
              <button onClick={() => setPage("Wildlife")} className="border border-white/30 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-white/10 transition">See Wildlife</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESTINATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function DestinationsPage() {
  const [activeId, setActiveId] = useState(1);
  const active = DESTINATIONS.find(d => d.id === activeId);

  return (
    <div className="min-h-screen bg-[#06111A] pt-20">
      <div className="relative h-64 md:h-72 bg-gray-800">
        <img src={IMAGES.volcanoes} alt="Destinations" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#06111A]" />
        <div className="absolute inset-0 flex items-end pb-10 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <span className="text-[#F0A830] text-xs tracking-widest uppercase">Explore</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-1">Rwanda's Destinations</h1>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-white/10 sticky top-16 z-30 bg-[#06111A]/98 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto py-2" style={{ scrollbarWidth:"none" }}>
          {DESTINATIONS.map(d => (
            <button key={d.id} onClick={() => setActiveId(d.id)}
              className={"shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap " +
                (activeId === d.id ? "bg-[#C8860A] text-white" : "text-white/50 hover:text-white hover:bg-white/10")}>
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[#C8860A] text-xs font-semibold tracking-widest uppercase">{active.region}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/40 text-xs">{active.duration}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{active.name}</h2>
            <span className="inline-block border border-[#C8860A]/50 text-[#C8860A] text-xs px-3 py-1 rounded-full mb-6">
              {active.tag}
            </span>
            <p className="text-white/70 text-lg leading-relaxed mb-5">{active.desc}</p>
            <p className="text-white/50 leading-relaxed mb-8">
              Rwanda's commitment to conservation means every visit directly funds local communities and wildlife protection. Permits are limited — book early to secure your place.
            </p>
            <ImageCarousel images={active.images} height="h-[420px]" />
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[{label:"Best Time",val:"Jun–Sep, Dec–Feb"},{label:"Duration",val:active.duration},{label:"Difficulty",val:"Moderate"}].map(i => (
                <div key={i.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/40 text-xs mb-1">{i.label}</div>
                  <div className="text-white font-semibold text-sm">{i.val}</div>
                </div>
              ))}
            </div>
            <button className="mt-8 bg-[#C8860A] hover:bg-[#F0A830] text-white px-8 py-4 rounded-2xl font-semibold transition hover:scale-105 shadow-lg">
              Book This Experience
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <h3 className="text-white/40 text-xs font-semibold tracking-widest uppercase border-b border-white/10 pb-3">
              Highlights
            </h3>
            {active.sidebar.map((s, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="text-[#C8860A] text-xs font-semibold tracking-wide mb-1">{s.label}</div>
                <h4 className="text-white text-xl font-bold mb-3 group-hover:text-[#F0A830] transition">{s.title}</h4>
                <div className="rounded-xl overflow-hidden h-44 bg-gray-800">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">All Destinations</h3>
              <div className="space-y-2">
                {DESTINATIONS.filter(d => d.id !== activeId).map(d => (
                  <button key={d.id} onClick={() => setActiveId(d.id)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition group text-left">
                    <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-700">
                      <img src={d.images[0]} alt={d.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium group-hover:text-[#F0A830] transition">{d.name}</div>
                      <div className="text-white/40 text-xs">{d.tag}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WILDLIFE
// ═══════════════════════════════════════════════════════════════════════════════
function WildlifePage() {
  const [selected, setSelected] = useState(0);
  const [safariStep, setSafariStep] = useState(0);
  const [picks, setPicks] = useState({});
  const [done, setDone] = useState(false);
  const [ref2, v2] = useScrollReveal();

  const safariOptions = [
    { label:"Duration",   options:["3 Days","5 Days","7 Days","10 Days"] },
    { label:"Group Size", options:["Solo","Couple","Family","Group (6+)"] },
    { label:"Focus",      options:["Gorillas","Big Five","Birds","Full Safari"] },
  ];

  return (
    <div className="min-h-screen bg-[#06111A] pt-20">
      <div className="relative h-[60vh] bg-gray-800">
        <img src={IMAGES.gorillas} alt="Mountain Gorillas" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#06111A]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#F0A830] text-xs tracking-widest uppercase mb-4 bg-black/30 backdrop-blur px-4 py-1.5 rounded-full">Wildlife & Nature</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Rwanda's Wild Heart</h1>
          <p className="text-white/70 text-xl max-w-2xl">Half the world's mountain gorillas live here.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Detail */}
          <div>
            <span className="text-[#C8860A] text-xs tracking-widest uppercase mb-2 block">{WILDLIFE[selected].count}</span>
            <h2 className="text-4xl font-bold text-white mb-4">{WILDLIFE[selected].name}</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">{WILDLIFE[selected].desc}</p>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-800">
              <img src={WILDLIFE[selected].img} alt={WILDLIFE[selected].name} className="w-full h-full object-cover" />
            </div>
          </div>
          {/* List */}
          <div className="space-y-3">
            <h3 className="text-white/40 text-xs font-semibold tracking-widest uppercase border-b border-white/10 pb-3">Meet the Residents</h3>
            {WILDLIFE.map((w, i) => (
              <button key={w.name} onClick={() => setSelected(i)}
                className={"w-full flex items-center gap-4 p-3 rounded-xl transition-all group text-left " +
                  (selected === i ? "bg-white/10 border border-white/15" : "hover:bg-white/5")}>
                <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-700">
                  <img src={w.img} alt={w.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{w.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{w.count}</div>
                </div>
                {selected === i && <div className="w-2 h-2 rounded-full bg-[#C8860A] shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-8 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[{num:"~1,063",label:"Mountain Gorillas",sub:"Half live in Rwanda"},{num:"700+",label:"Bird Species",sub:"Birder's paradise"},{num:"30%",label:"Land Protected",sub:"Parks & reserves"}].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#C8860A] to-[#F0A830] bg-clip-text text-transparent">{s.num}</div>
              <div className="text-white font-medium text-sm mt-1">{s.label}</div>
              <div className="text-white/40 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Safari simulator */}
      <section ref={ref2} className="px-4 py-16">
        <div className={"max-w-3xl mx-auto transition-all duration-700 " + (v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="relative h-44 bg-gray-800">
              <img src={IMAGES.safari} alt="Safari" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1a10]" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[#F0A830] text-xs tracking-widest uppercase">Interactive Demo</span>
                <h2 className="text-2xl font-bold text-white">Safari Booking Simulator</h2>
              </div>
            </div>
            <div className="p-8">
              {!done ? (
                safariStep < safariOptions.length ? (
                  <div>
                    <div className="flex gap-2 mb-8">
                      {safariOptions.map((_, i) => (
                        <div key={i} className={"flex-1 h-1 rounded-full transition-all duration-500 " + (i <= safariStep ? "bg-[#C8860A]" : "bg-white/10")} />
                      ))}
                    </div>
                    <h3 className="text-white/60 text-sm mb-4 uppercase tracking-widest">{safariOptions[safariStep].label}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {safariOptions[safariStep].options.map(opt => (
                        <button key={opt}
                          onClick={() => { setPicks({ ...picks, [safariOptions[safariStep].label]: opt }); setSafariStep(safariStep + 1); }}
                          className="p-4 rounded-xl border border-white/10 text-white hover:border-[#C8860A]/60 hover:bg-[#C8860A]/10 transition text-sm font-medium text-left">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Your Safari Configured</h3>
                    <div className="bg-white/5 rounded-xl p-5 mb-6 text-left space-y-2">
                      {Object.entries(picks).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span className="text-white/40">{k}</span>
                          <span className="text-[#F0A830] font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setDone(true)} className="bg-[#C8860A] hover:bg-[#F0A830] text-white px-8 py-3 rounded-xl font-semibold transition">Request Quote</button>
                      <button onClick={() => { setSafariStep(0); setPicks({}); }} className="border border-white/20 text-white/60 px-6 py-3 rounded-xl hover:bg-white/5 transition text-sm">Start Over</button>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-900/50 border border-green-700 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
                  <p className="text-white/50 text-sm">Our safari experts will contact you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CULTURE
// ═══════════════════════════════════════════════════════════════════════════════
function CulturePage() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [ref1, v1] = useScrollReveal();
  const [ref2, v2] = useScrollReveal();
  const [ref3, v3] = useScrollReveal();

  const quotes = [
    { text:"Rwanda is a country that looked at its wounds and chose to heal with grace.", author:"International Visitor, 2023" },
    { text:"Kigali surprised me more than any city on Earth — spotless streets, smiling faces, and a skyline that feels like the future arrived early.", author:"Travel Writer, Condé Nast" },
    { text:"When the gorilla's eyes met mine in Volcanoes National Park, I understood what it means to share a planet.", author:"Wildlife Photographer" },
  ];

  const timeline = [
    { year:"700 AD",  event:"Kingdom of Rwanda established — one of Africa's most organized early kingdoms." },
    { year:"1800s",   event:"Rwanda becomes a highly centralized monarchy with sophisticated social structures." },
    { year:"1962",    event:"Independence from Belgium. Rwanda begins its journey as a sovereign nation." },
    { year:"1994",    event:"Genocide against the Tutsi. 100 days that changed the world's understanding of human nature." },
    { year:"2000s",   event:"National reconciliation and Vision 2020 launched — Rwanda's remarkable reinvention begins." },
    { year:"2024",    event:"Rwanda ranked Africa's #1 tourism destination. Kigali named Africa's cleanest city." },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveQuote(q => (q + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#06111A] pt-20">
      <div className="relative h-[55vh] bg-gray-800">
        <img src={IMAGES.dance} alt="Rwandan Culture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#06111A]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#F0A830] text-xs tracking-widest uppercase mb-4">Culture & People</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white">A People of Strength</h1>
          <p className="text-white/60 text-xl mt-4 max-w-xl">Rwanda's culture is woven from resilience, artistry, and community.</p>
        </div>
      </div>

      {/* Dance */}
      <section ref={ref1} className="max-w-7xl mx-auto px-4 py-20">
        <div className={"grid md:grid-cols-2 gap-16 items-center transition-all duration-700 " + (v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div>
            <span className="text-[#C8860A] text-xs tracking-widest uppercase mb-4 block">Traditional Arts</span>
            <h2 className="text-4xl font-bold text-white mb-6">Intore Dancers</h2>
            <p className="text-white/60 leading-relaxed mb-4 text-lg">
              The Intore ("The Chosen Ones") are Rwanda's warrior dancers — performing with grass crowns, spears, and a ferocity that turns myth into movement.
            </p>
            <p className="text-white/50 leading-relaxed">
              Each dance tells a story of battle, harvest, or celebration — the drumbeats speak a language older than Rwanda's written history.
            </p>
            <button className="mt-8 border border-[#C8860A]/50 text-[#C8860A] hover:bg-[#C8860A] hover:text-white px-6 py-3 rounded-xl font-semibold transition">
              Learn More
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden h-80 bg-gray-800">
            <img src={IMAGES.dance} alt="Intore Dancers" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Food */}
      <section ref={ref2} className="px-4 py-16 border-t border-white/5">
        <div className={"max-w-6xl mx-auto transition-all duration-700 " + (v2 ? "opacity-100" : "opacity-0")}>
          <div className="text-center mb-12">
            <span className="text-[#C8860A] text-xs tracking-widest uppercase mb-3 block">Cuisine</span>
            <h2 className="text-4xl font-bold text-white">Taste Rwanda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FOODS.map((f, i) => (
              <div key={f.name}
                className={"group rounded-2xl overflow-hidden bg-gray-800 transition-all duration-700 " + (v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}
                style={{ transitionDelay: (i * 120) + "ms" }}>
                <div className="relative h-56">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-1">{f.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={ref3} className="px-4 py-16">
        <div className={"max-w-3xl mx-auto transition-all duration-700 " + (v3 ? "opacity-100" : "opacity-0")}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Rwanda's Story</h2>
            <p className="text-white/40 mt-3">From ancient kingdom to modern miracle</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#C8860A] via-[#1A5C3A] to-[#4A9BB8]" />
            <div className="space-y-8">
              {timeline.map(t => (
                <div key={t.year} className="pl-12 relative">
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-[#C8860A] shadow-lg" />
                  <div className="text-[#C8860A] text-xs font-bold tracking-widest mb-1">{t.year}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="px-4 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative min-h-[140px]">
            {quotes.map((q, i) => (
              <div key={i} className={"absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 " +
                (i === activeQuote ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
                <p className="text-white/80 text-xl italic leading-relaxed mb-4">&ldquo;{q.text}&rdquo;</p>
                <p className="text-white/30 text-sm">— {q.author}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center mt-8">
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setActiveQuote(i)}
                className={"h-1.5 rounded-full transition-all " + (i === activeQuote ? "bg-[#C8860A] w-8" : "bg-white/20 w-2")} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PLAN
// ═══════════════════════════════════════════════════════════════════════════════
function PlanPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ arrival:"", budget:2000, nights:7, interests:[] });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const interests = ["Gorilla Trekking","Safari & Wildlife","City & Culture","Nature & Hiking","Lake & Beach","Food & Cuisine","Arts & Music","Volcano Climbing"];
  const toggle = i => setForm(f => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i] }));
  const generate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500); };

  return (
    <div className="min-h-screen bg-[#06111A] pt-20">
      <div className="relative h-48 bg-gray-800">
        <img src={IMAGES.mountain} alt="Plan" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#06111A]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#F0A830] text-xs tracking-widest uppercase mb-3">Plan Your Journey</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Your Rwanda Adventure</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_320px] gap-12">
        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
          <div className="flex gap-2 mb-10">
            {["Dates","Budget","Interests","Generate"].map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center gap-2">
                <div className={"w-full h-1 rounded-full transition-all duration-500 " + (i <= step ? "bg-[#C8860A]" : "bg-white/10")} />
                <span className={"text-xs " + (i === step ? "text-[#F0A830]" : "text-white/25")}>{s}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">When are you arriving?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-sm mb-2 block">Arrival Date</label>
                  <input type="date" value={form.arrival} onChange={e => setForm({ ...form, arrival: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C8860A]/60 transition" />
                </div>
                <div>
                  <label className="text-white/40 text-sm mb-2 block">Nights</label>
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <button onClick={() => setForm(f => ({ ...f, nights: Math.max(1, f.nights - 1) }))} className="text-white/50 hover:text-white text-xl w-8">&#8722;</button>
                    <span className="flex-1 text-center text-white font-semibold">{form.nights}</span>
                    <button onClick={() => setForm(f => ({ ...f, nights: Math.min(30, f.nights + 1) }))} className="text-white/50 hover:text-white text-xl w-8">&#43;</button>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-[#C8860A] hover:bg-[#F0A830] text-white py-4 rounded-xl font-semibold transition">Continue</button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">What's your budget?</h2>
              <div className="text-center py-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-[#C8860A] to-[#F0A830] bg-clip-text text-transparent">
                  ${form.budget.toLocaleString()}
                </div>
                <div className="text-white/40 text-sm mt-1">per person, total</div>
              </div>
              <input type="range" min="500" max="10000" step="100" value={form.budget}
                onChange={e => setForm({ ...form, budget: +e.target.value })} className="w-full" />
              <div className="flex justify-between text-white/25 text-xs"><span>$500</span><span>$10,000</span></div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 border border-white/10 text-white/50 py-3 rounded-xl hover:bg-white/5 transition">Back</button>
                <button onClick={() => setStep(2)} className="flex-[2] bg-[#C8860A] hover:bg-[#F0A830] text-white py-3 rounded-xl font-semibold transition">Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">What excites you?</h2>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(int => (
                  <button key={int} onClick={() => toggle(int)}
                    className={"p-3.5 rounded-xl border text-sm transition-all text-left font-medium " +
                      (form.interests.includes(int) ? "border-[#C8860A]/60 bg-[#C8860A]/10 text-white" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70")}>
                    {int}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-white/10 text-white/50 py-3 rounded-xl hover:bg-white/5 transition">Back</button>
                <button onClick={() => setStep(3)} disabled={form.interests.length === 0}
                  className="flex-[2] bg-[#C8860A] hover:bg-[#F0A830] text-white py-3 rounded-xl font-semibold transition disabled:opacity-40">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Ready to Generate</h2>
              <div className="bg-white/5 rounded-2xl p-5 space-y-3">
                {[["Arrival", form.arrival || "Flexible"],["Duration", form.nights + " nights"],["Budget","$" + form.budget.toLocaleString()],["Interests", form.interests.length + " selected"]].map(([k,v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/40">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
              {!generated ? (
                <button onClick={generate} disabled={generating}
                  className="w-full bg-gradient-to-r from-[#1A5C3A] via-[#C8860A] to-[#4A9BB8] text-white py-5 rounded-2xl font-bold text-lg transition hover:scale-[1.01]">
                  {generating
                    ? <span className="flex items-center justify-center gap-3"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />Crafting your journey...</span>
                    : "Generate My Itinerary"}
                </button>
              ) : (
                <div>
                  <div className="space-y-3 bg-white/5 rounded-2xl p-6 mb-5">
                    {[
                      {day:"Day 1–2",act:"Arrive Kigali → Memorial → City tour",img:IMAGES.kigali},
                      {day:"Day 3–4",act:"Volcanoes NP → Gorilla trekking",img:IMAGES.gorillas},
                      {day:"Day 5–6",act:"Nyungwe → Canopy walk → Chimps",img:IMAGES.canopy},
                      {day:"Day 7",  act:"Lake Kivu boat → Departure",img:IMAGES.kivu},
                    ].map(item => (
                      <div key={item.day} className="flex gap-3 items-center">
                        <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-700">
                          <img src={item.img} alt={item.day} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[#F0A830] text-xs font-semibold">{item.day}</div>
                          <div className="text-white/60 text-sm">{item.act}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#C8860A] hover:bg-[#F0A830] text-white py-4 rounded-xl font-semibold transition">Book This Trip</button>
                </div>
              )}
              {!generated && <button onClick={() => setStep(2)} className="w-full text-white/30 text-sm hover:text-white/50 transition mt-2">Edit preferences</button>}
            </div>
          )}
        </div>

        {/* Itineraries sidebar */}
        <div className="space-y-4">
          <h3 className="text-white/40 text-xs font-semibold tracking-widest uppercase border-b border-white/10 pb-3">Suggested Itineraries</h3>
          {ITINERARIES.map(it => (
            <div key={it.title} className="group cursor-pointer bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all">
              <div className="relative h-36 bg-gray-800">
                <img src={it.img} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs font-semibold" style={{ color: it.color }}>{it.tag}</div>
                  <h4 className="text-white font-bold">{it.title}</h4>
                  <div className="text-white/60 text-sm">{it.price}</div>
                </div>
              </div>
              <div className="p-4 space-y-1.5">
                {it.days.map(d => (
                  <div key={d.day} className="flex gap-2 text-xs">
                    <span className="font-bold shrink-0" style={{ color: it.color }}>{d.day}</span>
                    <span className="text-white/50">{d.act}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="bg-[#040e14] border-t border-white/5 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C8860A]/60 bg-gray-800">
                <img src={IMAGES.volcanoes} alt="Rwanda" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-xl font-bold">Visit <span className="text-[#F0A830]">Rwanda</span></span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Rwanda Tourism Board — promoting the Land of a Thousand Hills as East Africa's premier travel destination.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Explore</h4>
            {["Destinations","Wildlife","Culture","Plan"].map(p => (
              <button key={p} onClick={() => setPage(p)} className="block text-white/30 hover:text-white text-sm mb-2 transition">
                {p === "Plan" ? "Plan Your Trip" : p}
              </button>
            ))}
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Rwanda</h4>
            <div className="space-y-2 text-white/30 text-sm">
              <p>East Africa</p>
              <p>Kigali International Airport</p>
              <p>RWF / USD accepted</p>
              <p>Tropical highland climate</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2025 Visit Rwanda. All rights reserved.</p>
          <p className="text-white/20 text-xs">The Land of a Thousand Hills</p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("Home");
  const navigate = p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderPage = () => {
    switch (page) {
      case "Home":         return <HomePage setPage={navigate} />;
      case "Destinations": return <DestinationsPage />;
      case "Wildlife":     return <WildlifePage />;
      case "Culture":      return <CulturePage />;
      case "Plan":         return <PlanPage />;
      default:             return <HomePage setPage={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06111A]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <ScrollProgress />
      <Nav page={page} setPage={navigate} />
      <div key={page} style={{ animation: "fadeIn 0.4s ease" }}>
        {renderPage()}
      </div>
      <Footer setPage={navigate} />
      <FloatingBtn setPage={navigate} />
    </div>
  );
}
