const formatPacket = (packet) => {
  const formatter = {
    id: packet.id,
    cover: packet.cover,
    image: packet.image,
    title: packet.title,
    subtitle: packet.subtitle,
    slug: packet.slug,
    description: packet.description,
    is_active: packet.is_active,
    category: {
      id: packet.category.id,
      name: packet.category.name,
      slug: packet.category.slug,
    },
  };
  return formatter;
};

const formatPackets = (packets) =>
  packets.map((packet) => formatPacket(packet));

module.exports = {formatPacket, formatPackets};
