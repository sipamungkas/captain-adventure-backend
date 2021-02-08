const formatProgram = (program) => {
  const formatter = {
    id: program.id,
    image: program.image,
    title: program.title,
    perks: program.perks,
    short_description: program.short_description,
    body: program.body,
    is_active: program.is_active,
  };
  return formatter;
};

const formatPrograms = (programs) =>
  programs.map((program) => formatProgram(program));

module.exports = {formatProgram, formatPrograms};
