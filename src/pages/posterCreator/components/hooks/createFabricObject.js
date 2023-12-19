import { fabric } from "fabric";

export const createFabricText = (fabricRef, name, className) => {
  const text = new fabric.IText(name, {
    top: 400,
    left: 400,
    fontSize: 55,
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "text",
    originY: "center",
  });
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
};

export const createMultiplyImage = (fabricRef, name, image, numberOfMatches) => {
  const objectsToAdd = [];
  const totalImages = numberOfMatches || 4;

  let loadedImages = 0;

  const onImageLoaded = (img) => {
    img.set({
      top: 200 + loadedImages * 100,
      left: 200,
      className: name,
      originX: "center",
      originY: "center",
      type: "multiplyimage",
      index: loadedImages + 1,
      selectable: loadedImages > 0 ? false : true,
    });
    img.scaleToHeight(150);
    objectsToAdd.push(img);

    loadedImages++;
    fabricRef.current.add(img);
    fabricRef.current.renderAll();
  };

  for (let i = 0; i < totalImages; i++) {
    fabric.Image.fromURL(image, (img) => onImageLoaded(img), { crossOrigin: "anonymous" });
  }
};

export const createMultiplyText = (fabricRef, name, innerText, numberOfMatches) => {
  const totalImages = numberOfMatches || 4;

  for (let i = 0; i < totalImages; i++) {
    const text = new fabric.IText(innerText, {
      top: 200 + i * 100,
      left: 200,
      className: name,
      fontFamily: "Poppins",
      originX: "center",
      originY: "center",
      type: "multiplyText",
      index: i + 1,
      selectable: i > 0 ? false : true,
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  }
};

export const createUniversalMultiplyText = (fabricRef, name, innerText, numberOfMatches) => {
  const totalImages = numberOfMatches || 4;
  let id = 0;
  fabricRef.current._objects.forEach((item) => {
    if (item.type === "multiplyUniversalText" && item.selectable === true) {
      id++;
    }
  });

  for (let i = 0; i < totalImages; i++) {
    const text = new fabric.IText(innerText, {
      top: 200 + i * 100,
      left: 200,
      id: id,
      className: name + id,
      fontFamily: "Poppins",
      originX: "center",
      originY: "center",
      type: "multiplyUniversalText",
      index: i + 1,
      selectable: i > 0 ? false : true,
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  }
};

function countElementsWithGivenType(arr, typeToCount) {
  let count = 0;
  for (const item of arr) {
    if (item.type === typeToCount) {
      count++;
    }
  }
  return count;
}

export const createFabricImage = (fabricRef, name, image, type) => {
  const quantity = countElementsWithGivenType(fabricRef.current._objects, type);

  fabric.Image.fromURL(image, function (img) {
    img.set({
      top: 400,
      left: 400,
      className: name !== "image" ? name : name + quantity,
      originX: "center",
      originY: "center",
      type: type,
    });
    img.scaleToHeight(150);
    fabricRef.current.add(img);
    if (img.type === "FilteredImage") {
      fabricRef.current.sendToBack(img);
    }
    fabricRef.current.renderAll();
  });
};

export const createPlayerImage = (fabricRef, name, image, type) => {
  console.log(type);
  const quantity = countElementsWithGivenType(fabricRef.current._objects, type);
  fabric.Image.fromURL(image, function (img) {
    img.set({
      top: 400,
      left: 400,
      className: name + quantity,
      originX: "center",
      originY: "top",
      type: type,
    });
    img.scaleToHeight(150);
    fabricRef.current.add(img);
    fabricRef.current.renderAll();
  });
};

export const createFabricTextBox = (fabricRef, name, className) => {
  const text = new fabric.Textbox(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    lineHeight: 1,
    width: 500,
    originX: "center",
    originY: "top",
    className: className,
    textAlign: "left",
    fill: "#000000",
    fontFamily: "Poppins",
    Format: "NumDotSurName",
    Formatter: className === "reserveOne" ? "," : undefined,
    type: "textBox",
  });
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
};
export const createPlayerNameText = (fabricRef, name, className) => {
  const quantity = countElementsWithGivenType(fabricRef.current._objects, "playerGoal");
  const text = new fabric.IText(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    width: 500,
    originX: "center",
    originY: "center",
    className: className + quantity,
    fill: "#000000",
    fontFamily: "Poppins",
    format: "dotted",
    type: "playerGoal",
  });
  fabricRef.current.add(text);

  fabricRef.current.renderAll();
};

export const createUniversalText = (fabricRef, name) => {
  const quantity = countElementsWithGivenType(fabricRef.current._objects, "universalText");
  const text = new fabric.IText(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    width: 500,
    originX: "center",
    originY: "center",
    className: "tekst" + quantity,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "universalText",
  });
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
};
export const createUniversalTextBox = (fabricRef, name, className) => {
  const text = new fabric.Textbox(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    width: 500,
    originX: "center",
    originY: "center",
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "universalTextBox",
  });
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
};
