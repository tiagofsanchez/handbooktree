export default function extractUsername(email) {
    // Define a regular expression pattern to match the username
    var pattern = /^([^@]+)@/;
    var match = email?.match(pattern);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}
