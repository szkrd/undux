const motdService = {
  getRandomQuote: (): string => {
    const quotes = [
      'Any sufficiently advanced technology is indistinguishable from magic. (Clarke)',
      'Science is magic that works. (Vonnegut)',
      'How nice - to feel nothing, and still get full credit for being alive. (Vonnegut)',
      'Reason shapes the future, but superstition infects the present. (Banks)',
      'Empathize with stupidity and you’re halfway to thinking like an idiot. (Banks)',
      'When in Rome; burn it. (Banks)',
      'The bomb lives only as it is falling. (Banks)',
      "We are here on Earth to fart around, and don't let anybody tell you different. (Vonnegut)",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },
};

export default motdService;
