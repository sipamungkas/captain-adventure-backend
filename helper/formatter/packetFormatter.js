const formatPacket = (packet) => {
  const formatter = {
    id: packet.id,
    image: packet.image,
    title: packet.title,
    subtitle: packet.subtitle,
    slug: packet.slug,
    description: packet.description,
    is_active: packet.is_active,
    category: {
      id: packet.Category.id,
      name: packet.Category.name,
      slug: packet.Category.slug,
    },
  };
  return formatter;
};

const formatPackets = (packets) =>
  packets.map((packet) => formatPacket(packet));

module.exports = {formatPacket, formatPackets};
