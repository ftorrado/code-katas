class List<T> {
  readonly values: T[];

  constructor(elements: T[] = []) {
    this.values = elements;
  }

  length(): number {
    return this.values.length;
  }

  push(el: T): List<T> {
    return new List([...this.values, el]);
  }

  append(appendList: List<T>): List<T> {
    return new List<T>([...this.values, ...appendList.values]);
  }

  foldl<S>(predicate: (acc: S, el: T) => S, defaultValue: S): S {
    let result = defaultValue;
    for (let i = 0; i < this.values.length; i++) {
      result = predicate(result, this.values[i]);
    }
    return result;
  }

  foldr<S>(predicate: (acc: S, el: T) => S, defaultValue: S): S {
    let result = defaultValue;
    for (let i = this.values.length - 1; i >= 0; i--) {
      result = predicate(result, this.values[i]);
    }
    return result;
  }

  reverse(): List<T> {
    return this.foldr((acc, el) => acc.push(el), new List());
  }

  concat(listOfLists: List<List<T>>): List<T> {
    return listOfLists.foldl<List<T>>((acc, el) => acc.append(el), this);
  }

  filter(predicate: (el: T) => boolean): List<T> {
    return this.foldl((acc, el) => {
      if (predicate(el)) {
        return acc.push(el);
      } else {
        return acc;
      }
    }, new List());
  }

  map(predicate: (el: T) => T): List<T> {
    return this.foldl((acc, el) => acc.push(predicate(el)), new List());
  }
}
export default List;

function isListofLists(list: List<any>): list is List<List<any>> {
  return (
    Array.isArray(list.values) &&
    list.values.every(element => element instanceof List)
  );
}
