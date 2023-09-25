class CreateNewElementHTML {
    constructor(node_Element, type_Element, name_Element, class_Name, value_Element){
        this.node_Element = node_Element;
        this.type_Element = type_Element;
        this.name_Element = name_Element;
        this.class_Name = class_Name;
        this.value_Element = value_Element;
    }

    createElement () {
        const element = document.createElement(this.node_Element);
        element.name = this.name_Element;
        element.type = this.type_Element;
        element.className = this.class_Name;
        element.value = this.value_Element;
        return element;
    
    }
}

export { CreateNewElementHTML };