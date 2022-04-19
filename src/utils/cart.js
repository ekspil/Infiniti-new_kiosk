export const cartPlus = (cart, product) => {
  product = JSON.parse(JSON.stringify(product))
  if (!product.count) product.count = 1;
  const isProduct = cart.find(
    (item) =>
      item.id === product.id &&
      item.mods === product.mods &&
      product.price === item.price
  );
  if (!isProduct) {
    cart.push(product);
    return cart;
  } else {
    return cart.map((item) => {
      if (item.id !== product.id) return item;
      if (
        item.id === product.id &&
        item.mods === product.mods &&
        product.price === item.price
      ) {
        item.count++;
        return item;
      }

      return item;
    });
  }
};
export const cartMinus = (cart, product) => {
  cart = cart.map((item) => {
    if (item.id !== product.id) return item;
    if (
      item.id === product.id &&
      item.mods === product.mods &&
      product.price === item.price
    ) {
      item.count--;
      return item;
    }

    return item;
  });

  return cart.filter((item) => item.count > 0);
};

export const cartDelete = (cart, product) => {
  return cart.filter((item) => {
    if (
      item.id === product.id &&
      item.mods === product.mods &&
      product.price === item.price
    ) {
      return false;
    } else {
      return true;
    }
  });
};

export const cartReduce = (cart) => {
  return cart.reduce(
    (acc, item) => {
      if (!item.count) item.count = 1;
      acc.sum = acc.sum + item.count * item.price;
      acc.count = acc.count + item.count;
      return acc;
    },
    { count: 0, sum: 0 }
  );
};
