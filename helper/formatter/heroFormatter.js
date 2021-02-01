const formatHero = (hero) => {
  const formatter = {
    id: hero.id,
    image: hero.image,
    video: hero.video,
    title: hero.title,
    short_description: hero.short_description,
    is_active: hero.is_active,
  };
  return formatter;
};

const formatHeros = (heros) => heros.map((hero) => formatHero(hero));

module.exports = {formatHero, formatHeros};
