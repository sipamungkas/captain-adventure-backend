const formatPacket = (packet) => {
  const formatter = {
    id: packet.id,
    image: packet.image,
    title: packet.title,
    perks: packet.perks,
    short_description: packet.short_description,
    start_at: packet.start_at,
    subtitle: packet.subtitle,
    slug: packet.slug,
    description: packet.description,
    is_active: packet.is_active,
    category: {
      id: packet?.category?.id ?? null,
      name: packet?.category?.name ?? 'uncategorized',
      slug: packet?.category?.slug ?? null,
    },
  };
  return formatter;
};

const formatPackets = (packets) =>
  packets.map((packet) => formatPacket(packet));

module.exports = {formatPacket, formatPackets};
