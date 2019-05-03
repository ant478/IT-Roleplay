interface Treeable {
  parent: Treeable | null;
}

export default function buildRows<T extends Treeable>(elements: T[]): T[][] {
  const rowsHeads = elements.filter(({ parent }) => !parent);

  return rowsHeads.reduce(
    (rows, element) => {
      const row = [];
      let nextInRow: T | null = element;

      while (nextInRow !== null) {
        row.push(nextInRow);
        nextInRow = elements.find(({ parent }) => parent === nextInRow) || null;
      }

      return [...rows, row];
    },
    [] as T[][],
  );
}
