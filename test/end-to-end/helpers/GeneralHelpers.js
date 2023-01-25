function decodeHTML(str) {
    return str.replace(/&([a-zA-Z]+);/g,
        tag => ({
            '&rsquo;': '’',
            '&lsquo;': '‘',
            '&iuml;': 'ï',
            '&acirc;': 'â',
            '&ecirc;': 'ê',
            '&icirc;': 'î',
            '&ocirc;': 'ô',
            '&ucirc;': 'û',
            '&wcirc;': 'ŵ',
            '&ycirc;': 'ŷ',
            'a&#770;': 'â',
            'e&#770;': 'ê',
            'i&#770;': 'î',
            'o&#770;': 'ô',
            'u&#770;': 'û',
            'w&#770;': 'ŵ',
            'y&#770;': 'ŷ',
        }[tag]));
}

module.exports = {
    decodeHTML
};
