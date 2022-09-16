export const cartPlus = (cart, product) => {
  product = JSON.parse(JSON.stringify(product));
  if (!product.count) product.count = 1;
  const isProduct = cart.find(
    (item) =>
      item.id === product.id &&
      JSON.stringify(item.items) === JSON.stringify(product.items) &&
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
        JSON.stringify(item.items) === JSON.stringify(product.items) &&
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
      item.items === product.items &&
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
      item.items === product.items &&
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

export const orderTypeStyle = (orderTypeThis) => {
  if (orderTypeThis === "IN") {
    return {
      inColor: "grey lighten-4",
      outColor: "brown",
      inDark: false,
      outDark: true,
    };
  } else {
    return {
      outColor: "grey lighten-4",
      inColor: "brown",
      inDark: true,
      outDark: false,
    };
  }
};

export const helpersForYou = (helpersThis, productsThis, cartThis, kiosk) => {
  if (!helpersThis) return [];
  let helpers = JSON.parse(JSON.stringify(helpersThis));
  helpers = helpers.filter((item) => {
    for (let it of cartThis) {
      if (item.exclude.includes(it.group_id)) return false;
    }
    if (item.hidden === true) return false;
    if (kiosk.stops.includes(item.id)) return false;
    return true;
  });
  helpers.sort((a, b) => {
    if (Number(a.priority) > Number(b.priority)) return 1; // если первое значение больше второго
    if (Number(a.priority) === Number(b.priority)) return 0; // если равны
    if (Number(a.priority) < Number(b.priority)) return -1;
  });

  const randomProductId = helpers.map((item) => {
    return item.items[Math.floor(Math.random() * item.items.length)];
  });
  const result = randomProductId.map((item) => {
    return productsThis.find((it) => it.id === item);
  });

  return result.filter((it) => it);
};
