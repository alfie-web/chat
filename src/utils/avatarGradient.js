import  tinycolor from 'tinycolor2';

export default (hash) => {
            const [r, g, b] = hash.toString().substr(0, 3).split('')
                        .map(char => char.charCodeAt(0) > 255 ? 255 : char.charCodeAt(0) < 0 ? 0 : char.charCodeAt(0));
            return {
                        color1: tinycolor({ r, g, b}).toHexString(), 
                        color2: tinycolor({ r, g, b}).lighten(40).toHexString()
            };
}