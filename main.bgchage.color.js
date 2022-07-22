let htmlcode = `
    <span class='color_code' style='color:#181B39' data-color-code='#181B39'>■</span>
    <span class='color_code' style='color:#262a2e' data-color-code='#262a2e'>■</span>
    <span class='color_code' style='color:#192734' data-color-code='#192734'>■</span>
    <span class='color_code' style='color:#1c483b' data-color-code='#1c483b'>■</span>
    <span class='color_code' style='color:#bf7800' data-color-code='#bf7800'>■</span>
    <span class='color_code' style='color:#83094f' data-color-code='#83094f'>■</span>
`;
const basecolor = "#262a2e";
let cookiefn = function (val) {
    let CodeColor = val;
    let r = document.cookie.split(';');
    return r?((r)=>{
        for(let ii = 0 ;ii<r.length;ii++){
            let content = r[ii].split('=');
            for(let i = 0 ;i<content.length;i++){
                if(content[i].replaceAll(" ","")==="bgcolor_code"){
                    CodeColor = content[i +1];
                }
            }
        }
    return CodeColor;        
})(r):CodeColor;
};
let old_color = cookiefn(basecolor);
console.log("log=" + old_color);
document.getElementById("site_description").insertAdjacentHTML("afterend", htmlcode);
let ColorCodeObject = document.querySelectorAll(".color_code");
for (const key in ColorCodeObject) {
    if (Object.hasOwnProperty.call(ColorCodeObject, key)) {
        const element = ColorCodeObject[key];
        element.addEventListener("click", function (element) {
            for (let ii = 0; ii < document.styleSheets.length; ii++) {
                if (String(document.styleSheets[ii].href).match(/example.com\/style\.css\?ver=/)) {
                    for (let i = 0; i < document.styleSheets[ii].cssRules.length; i++) {
                        let element_css_code = document.styleSheets[ii].cssRules[i];
                        let rgbfn = function (hex) {
                            let red = parseInt(hex[1] + hex[2], 16);
                            let green = parseInt(hex[3] + hex[4], 16);
                            let blue = parseInt(hex[5] + hex[6], 16);
                            return `rgb(${red},${green},${blue})`;
                        };
                        try {
                            if (element_css_code.style.backgroundColor.replaceAll(" ","") === rgbfn(old_color).replaceAll(" ","")) {
                                console.log(rgbfn(old_color));
                                element_css_code.style.backgroundColor = rgbfn(ColorCodeObject[key].getAttribute("data-color-code"));
                            }
                        } catch (error) {
                            //console.log("not backgroundColor");
                        }
                    }
                    old_color = ColorCodeObject[key].getAttribute("data-color-code");
                    document.cookie = "bgcolor_code=" + old_color;
                }
            }
        });
    }
}
(function(){
        for (let ii = 0; ii < document.styleSheets.length; ii++) {
            if (String(document.styleSheets[ii].href).match(/example.com\/style\.css\?ver=/)) {
                for (let i = 0; i < document.styleSheets[ii].cssRules.length; i++) {
                    let element_css_code = document.styleSheets[ii].cssRules[i];
                    let rgbfn = function (hex) {
                        let red = parseInt(hex[1] + hex[2], 16);
                        let green = parseInt(hex[3] + hex[4], 16);
                        let blue = parseInt(hex[5] + hex[6], 16);
                        return `rgb( ${red}, ${green}, ${blue})`;
                    };
                    try {
                        console.warn(element_css_code.style.backgroundColor.replaceAll(" ","") + " === " + rgbfn(old_color).replaceAll(" ",""));
                        if (element_css_code.style.backgroundColor.replaceAll(" ","") === rgbfn(basecolor).replaceAll(" ","")) {
                            element_css_code.style.backgroundColor = rgbfn(old_color);
                        }
                    } catch (error) {
                        //console.log("not backgroundColor");
                    }
                }
                document.cookie = "bgcolor_code=" + old_color;
            }
        }    
})();
