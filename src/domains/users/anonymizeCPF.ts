function anonymizeCPF(cpf: string): string {
  let digitalCount = 0;

  const maskedCPF = [...cpf].reduce((acc, char) => {
    if (char >= '0' && char <= '9') {
      digitalCount++;
      acc += digitalCount <= 3 ? '*' : char;
      return acc;
    }

    acc += char;

    return acc;
  }, '');

  return maskedCPF;
}

export { anonymizeCPF };
