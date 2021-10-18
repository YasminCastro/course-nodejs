const add = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      return reject("Numbers must be non-negative");
    }
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  //   throw new Error("somenthing went wrong");
  //
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

doWork()
  .then((result) => {
    console.log("result", result);
  })
  .catch((e) => {
    console.log("e", e);
  });
