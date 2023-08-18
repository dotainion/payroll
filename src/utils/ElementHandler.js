import $ from 'jquery';

export class ElementHandler{
    applyInlineStyle(element, includeChildren = true) {
        if (!element) throw new Error("No element specified.");     
        element = $(element)[0]; 
      
        var srcRules = document.createElement(element.tagName).style;
        srcRules.cssText = element.style.cssText;
        this.matchRules(element).forEach(rule => {
            Object.values(rule.style || {}).filter((v)=>!!v).forEach((value)=>{
                let val = srcRules.getPropertyValue(value) || rule.style.getPropertyValue(value);
                let priority = rule.style.getPropertyPriority(value);
                element.style.setProperty(value, this.replaceCssVariables(val), priority);
            });
        });
      
        if (!includeChildren) return;
        $(element).children().each((i, child) => this.applyInlineStyle(child, includeChildren));
    }
      
    matchRules(element, sheets) {
        let styles = [];
        sheets = sheets || document.styleSheets;
        Object.keys(sheets || {}).forEach((_, i)=>{
            if (!sheets.hasOwnProperty(i)) return;
            const rules = sheets[i].rules || sheets?.[i]?.cssRules;
            Object.keys(rules || {}).forEach((i)=>{
                if (element.matches(rules?.[i]?.selectorText)) {
                    styles.push(rules?.[i]);
                }
            });
        });
        return styles;
    }

    replaceCssVariables(str){
        let cssVariables = [];
        str.split('(').forEach((val)=>{
            const mySubString = val.substring(val.indexOf(''), val.indexOf(')'));
            mySubString && cssVariables.push(mySubString);
        });
        cssVariables.forEach((val)=>{
            const colorAccent = getComputedStyle(document.documentElement).getPropertyValue(val);
            str = str.replace('var('+val+')', colorAccent);
            str = str.replace(',)', ')').replace(', )', ')');
        });
        return str;
    }
}