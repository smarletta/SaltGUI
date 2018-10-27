class TargetType {

  static createMenu() {
    const targetbox = document.getElementById("targetbox");
    TargetType.menuTargetType = new DropDownMenu(targetbox);
    // do not show the menu title at first
    TargetType.menuTargetType.addMenuItem("Normal", this.manualUpdateTargetTypeText, "glob");
    TargetType.menuTargetType.addMenuItem("List", this.manualUpdateTargetTypeText, "list");
    TargetType.menuTargetType.addMenuItem("Compound", this.manualUpdateTargetTypeText, "compound");
    TargetType.setTargetTypeDefault();
  }

  static autoSelectTargetType(target) {

    if(TargetType.menuTargetType._value !== undefined &&
      TargetType.menuTargetType._value !== "" &&
      !TargetType.menuTargetType._system) {
      // user has selected the value, do not touch it
      return;
    }

    if(target.includes("@") || target.includes(" ") ||
       target.includes("(") || target.includes(")")) {
      // "@" is a strong indicator for compound target
      // but "space", "(" and ")" are also typical for compound target
      TargetType.menuTargetType._value = "compound";
      TargetType._updateTargetTypeText();
      return;
    }

    if(target.includes(",")) {
      // "," is a strong indicator for list target (when it is also not compound)
      TargetType.menuTargetType._value = "list";
      TargetType._updateTargetTypeText();
      return;
    }

    // do not show it when default and not explicitly selected
    TargetType.setTargetTypeDefault();
  }

  static manualUpdateTargetTypeText() {
    TargetType.menuTargetType._system = false;
    TargetType._updateTargetTypeText();
  }

  static _updateTargetTypeText() {
    const targetType = TargetType.getTargetType();

    switch(targetType) {
    case "compound":
      TargetType.menuTargetType.setTitle("Compound");
      break;
    case "glob":
      // now that the menu is used show the menu title
      TargetType.menuTargetType.setTitle("Normal");
      break;
    case "list":
      TargetType.menuTargetType.setTitle("List");
      break;
    }
  }

  static setTargetTypeDefault() {
    TargetType.menuTargetType._value = "glob";
    // reset the title to the absolute minimum
    // so that the menu does not stand out in trivial situations
    TargetType.menuTargetType.setTitle("");
    TargetType.menuTargetType._system = true;
  }

  static getTargetType() {
    const targetType = TargetType.menuTargetType._value;
    if(targetType === undefined || targetType === "") return "glob";
    return targetType;
  }

}