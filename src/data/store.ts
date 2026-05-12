import type { Testimonial, Post, Service, Property, Partner, Category } from "./types";

// ─── Defaults (migrated from hardcoded data) ──────────────────────────────────

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "O Fernando ajudou-me a encontrar as melhores condições de crédito habitação. Profissionalismo e dedicação excepcionais — tratou de tudo, eu só precisei de assinar.",
    name: "Maria Silva", role: "Cliente · 2022",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote: "Excelente acompanhamento na venda do meu imóvel. Sempre disponível e com soluções para tudo o que ia surgindo. Recomendo de olhos fechados.",
    name: "João Santos", role: "Cliente · 2021",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote: "Consegui consolidar todos os meus créditos com condições muito melhores. Acabou um problema que arrastava há anos. Obrigada, Fernando.",
    name: "Ana Costa", role: "Cliente · 2023",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

export const DEFAULT_POSTS: Post[] = [
  {
    id: "p1", cat: "credito", catLabel: "Crédito", featured: true,
    title: "Taxas Euribor a descer: vale a pena transferir o crédito agora?",
    excerpt: "Em maio de 2026, com a Euribor a 12 meses abaixo dos 2,3%, muitos contratos antigos passaram a ser candidatos óbvios a refinanciamento. Mas nem todos.",
    date: "04 Mai 2026", read: "12 min",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=85&w=1600&auto=format&fit=crop",
    body: `A Euribor a 12 meses fechou abril de 2026 nos 2,28% — o valor mais baixo desde o início do ciclo de subidas em 2022. Para muita gente com crédito habitação a taxa variável, a prestação já baixou naturalmente. Mas há um grupo que ficou para trás: quem assinou contratos entre 2021 e 2023, quando os spreads eram altos e as condições gerais menos favoráveis.

Se o seu spread é igual ou superior a 1,2% e o capital em dívida está acima dos 80 000 €, há uma probabilidade elevada de a transferência compensar — mesmo depois de contar os custos de saída, que em muitos casos ficam nos 0,5% do capital.

O que olhar antes de decidir? Primeiro, o MTIC do novo contrato. Não o spread isolado — o MTIC (Montante Total Imputado ao Consumidor) conta tudo: juros, comissões, seguros obrigatórios. Dois bancos com spreads iguais podem ter MITCs muito diferentes consoante as condições dos seguros associados.

Segundo, o prazo remanescente. Transferir a 5 anos do fim raramente compensa: o esforço burocrático é o mesmo, mas a poupança em juros é pequena porque o crédito já está na fase em que a amortização pesa mais do que os juros.

Terceiro, o calendário de revisão do seu indexante. Se a sua Euribor revê em outubro, faz sentido comparar propostas agora — e ter o processo encaminhado antes do verão, quando os serviços dos bancos abrandam.

A minha recomendação: faça uma simulação comparativa com pelo menos dois bancos e compare o MTIC ponto a ponto. Se a diferença for superior a 3 000 € em valor atual líquido, o processo vale o esforço. Se não, espere — as taxas ainda têm margem para baixar ligeiramente no segundo semestre, e uma nova janela de oportunidade pode surgir.`,
  },
  {
    id: "p2", cat: "credito", catLabel: "Crédito",
    title: "Spread, TAEG, MTIC: o que olhar primeiro numa simulação",
    excerpt: "Três siglas que decidem quanto vai pagar a mais — e quase ninguém compara da forma certa.",
    date: "28 Abr 2026", read: "7 min",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p3", cat: "mercado", catLabel: "Mercado",
    title: "O Porto em 2026: zonas que ainda não chegaram ao teto",
    excerpt: "Análise por freguesia: onde os preços por m² ainda têm folga e onde já estão saturados.",
    date: "22 Abr 2026", read: "10 min",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p4", cat: "guias", catLabel: "Guia",
    title: "Primeira casa: o checklist completo antes da escritura",
    excerpt: "IMT, IMI, IS, certificado energético, vistoria. A ordem em que se trata de tudo, sem surpresas.",
    date: "15 Abr 2026", read: "14 min",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p5", cat: "investimento", catLabel: "Investimento",
    title: "Arrendamento de longa duração vs. alojamento local: a conta real",
    excerpt: "Comparei os dois cenários num T2 na Foz, 24 meses, todos os custos incluídos. O resultado surpreendeu-me.",
    date: "08 Abr 2026", read: "11 min",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p6", cat: "credito", catLabel: "Crédito",
    title: "Taxa fixa, mista ou variável em 2026?",
    excerpt: "Com a Euribor a estabilizar, voltou a discussão de qual o melhor regime. Depende — eis o que olhar.",
    date: "02 Abr 2026", read: "8 min",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p7", cat: "historias", catLabel: "História",
    title: "A casa que ninguém queria — e o cliente que viu o que faltava",
    excerpt: "Uma moradia em Gondomar parada há 18 meses. O que mudou em quatro semanas, com 1.200€ de obras.",
    date: "25 Mar 2026", read: "6 min",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p8", cat: "guias", catLabel: "Guia",
    title: "Vender sem mediador: porque é (quase sempre) mais caro",
    excerpt: "A poupança aparente nos 5% de comissão raramente compensa o tempo, os erros e o desconto da urgência.",
    date: "18 Mar 2026", read: "9 min",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p9", cat: "mercado", catLabel: "Mercado",
    title: "Habitação acessível em Vila Nova de Gaia: o que mudou",
    excerpt: "O programa municipal e o que significa, na prática, para quem procura primeira casa abaixo dos 200k€.",
    date: "10 Mar 2026", read: "5 min",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=85&w=900&auto=format&fit=crop",
  },
  {
    id: "p10", cat: "investimento", catLabel: "Investimento",
    title: "Cinco erros que destroem a rentabilidade de um T1",
    excerpt: "Comprei o imóvel certo. Errei tudo o resto. Lições de um caso real, com números abertos.",
    date: "03 Mar 2026", read: "8 min",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=85&w=900&auto=format&fit=crop",
  },
];

export const DEFAULT_SERVICES: Service[] = [
  { id: "s1", iconName: "Home",           title: "Crédito Habitação",        desc: "Melhores condições junto dos principais bancos. Eu negoceio, você assina.", details: "", link: "", tag: "Popular" },
  { id: "s2", iconName: "Key",            title: "Mediação Imobiliária",     desc: "Comprar, vender ou arrendar — com avaliação rigorosa e marketing pensado para o seu imóvel.", details: "", link: "" },
  { id: "s3", iconName: "Shield",         title: "Seguros",                  desc: "Proteção para si, família e património. Comparo o mercado por si.", details: "", link: "" },
  { id: "s4", iconName: "ArrowLeftRight", title: "Transferência de Crédito", desc: "Reveja o seu crédito atual. Se houver melhor, mudamos sem complicações.", details: "", link: "" },
  { id: "s5", iconName: "Ruler",          title: "Avaliação de Imóveis",     desc: "Avaliações independentes e transparentes do valor real do seu imóvel.", details: "", link: "" },
  { id: "s6", iconName: "TrendingUp",     title: "Investimento",             desc: "Rentabilidade pensada — onde comprar, a que preço, para que retorno.", details: "", link: "" },
];

export const DEFAULT_PROPERTIES: Property[] = [
  { id: "i1", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=800&auto=format&fit=crop", title: "Moradia T4", location: "Foz do Douro, Porto", price: "€ 550.000", type: "Moradia", area: "180m²", link: "" },
  { id: "i2", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=85&w=800&auto=format&fit=crop", title: "Apartamento T3", location: "Boavista, Porto", price: "€ 320.000", type: "Apartamento", area: "120m²", link: "" },
  { id: "i3", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=800&auto=format&fit=crop", title: "Moradia T5", location: "Matosinhos, Porto", price: "€ 680.000", type: "Moradia", area: "220m²", link: "" },
  { id: "i4", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=800&auto=format&fit=crop", title: "Apartamento T2", location: "Cedofeita, Porto", price: "€ 245.000", type: "Apartamento", area: "90m²", link: "" },
  { id: "i5", img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=85&w=800&auto=format&fit=crop", title: "Moradia T3", location: "Valongo, Porto", price: "€ 380.000", type: "Moradia", area: "150m²", link: "" },
  { id: "i6", img: "https://images.unsplash.com/photo-1600047509804-630b7553b168?q=85&w=800&auto=format&fit=crop", title: "Apartamento T1", location: "Ribeira, Porto", price: "€ 190.000", type: "Apartamento", area: "65m²", link: "" },
  { id: "i7", img: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=85&w=800&auto=format&fit=crop", title: "Moradia T6", location: "Gaia, Porto", price: "€ 750.000", type: "Moradia", area: "260m²", link: "" },
  { id: "i8", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=85&w=800&auto=format&fit=crop", title: "Apartamento T3", location: "Paranhos, Porto", price: "€ 290.000", type: "Apartamento", area: "105m²", link: "" },
];

export const DEFAULT_PARTNERS: Partner[] = [
  { id: "pa1", name: "Parceiro 1", img: "/partners/partner-1.png" },
  { id: "pa2", name: "Parceiro 2", img: "/partners/partner-2.png" },
  { id: "pa3", name: "Parceiro 3", img: "/partners/partner-3.png" },
  { id: "pa4", name: "Parceiro 4", img: "/partners/partner-4.png" },
  { id: "pa5", name: "Parceiro 5", img: "/partners/partner-5.png" },
  { id: "pa6", name: "Parceiro 6", img: "/partners/partner-6.png" },
  { id: "pa7", name: "Parceiro 7", img: "/partners/partner-7.png" },
];

export const DEFAULT_CATS: Category[] = [
  { id: "credito",      label: "Crédito" },
  { id: "mercado",      label: "Mercado" },
  { id: "guias",        label: "Guia" },
  { id: "investimento", label: "Investimento" },
  { id: "historias",    label: "História" },
];

// ─── Persistence ──────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  getTestimonials: () => load<Testimonial[]>("kcasa_testimonials", DEFAULT_TESTIMONIALS),
  setTestimonials: (v: Testimonial[]) => save("kcasa_testimonials", v),
  getServices: () => load<Service[]>("kcasa_services", DEFAULT_SERVICES),
  setServices: (v: Service[]) => save("kcasa_services", v),
  getProperties: () => load<Property[]>("kcasa_properties", DEFAULT_PROPERTIES),
  setProperties: (v: Property[]) => save("kcasa_properties", v),
  getPartners: () => load<Partner[]>("kcasa_partners", DEFAULT_PARTNERS),
  setPartners: (v: Partner[]) => save("kcasa_partners", v),
  getPosts: () => load<Post[]>("kcasa_posts", DEFAULT_POSTS),
  setPosts: (v: Post[]) => save("kcasa_posts", v),
  getCategories: () => load<Category[]>("kcasa_categories", DEFAULT_CATS),
  setCategories: (v: Category[]) => save("kcasa_categories", v),
  getSiteTheme: (): "dark" | "light" => localStorage.getItem("kcasa_site_theme") === "light" ? "light" : "dark",
  setSiteTheme: (v: "dark" | "light") => {
    localStorage.setItem("kcasa_site_theme", v);
    applyTheme(v);
  },
};

export function applyTheme(t: "dark" | "light") {
  if (t === "light") document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const auth = {
  check: () => sessionStorage.getItem("kcasa_admin") === "1",
  login: (user: string, pw: string): boolean => {
    if (user === "admin" && pw === "admin") {
      sessionStorage.setItem("kcasa_admin", "1");
      return true;
    }
    return false;
  },
  logout: () => sessionStorage.removeItem("kcasa_admin"),
};

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
