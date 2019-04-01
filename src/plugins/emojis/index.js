const Emoji = {
    data : require('./light.json'),
    parse : str => String(str).replace(/:(.+?):/g, (placeholder, key) => Emoji.data[key] || placeholder)
}

module.exports = Emoji