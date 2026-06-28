function parseArgs(content) {
  const args = {};

  // --name "something"
  const nameMatch = content.match(/--name\s+"([^"]+)"/);
  if (nameMatch) args.name = nameMatch[1];

  // --private yes/no
  const privateMatch = content.match(/--private\s+(yes|no)/);
  if (privateMatch) args.private = privateMatch[1];

  return args;
}

module.exports = { parseArgs };