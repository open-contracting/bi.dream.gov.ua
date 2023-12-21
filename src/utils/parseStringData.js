// Based on https://github.com/danmoore83/parse-string-data algorithms
// Convert strings into a formatted value.
// ---------------------------------------
// - True/False strings into Boolean
// - Null strings to null value
// - Number strings to Number
function _formatValues(val) {
  const matchStr = val.match(/^"(.*)"$/);
  if(matchStr && matchStr[1])
    return matchStr[1];

	const numberVal = Number(val);
		// valueMap = {
		// 	'true': true,
		// 	'false': false,
		// 	'null': null
		// };
	// Return mapped Value || formatted Number || existing string
  // valueMap.hasOwnProperty(val) ? valueMap[val] : 
	return !isNaN(numberVal) ? numberVal : val;
}

// Match regex not contined within square or curly brackets
// --------------------------------------------------------
// - Joins regex param with a negative lookahead assertion
// eslint-disable-next-line
function _matchOutsideBrackets(reg, negativeLookaheadForBrackets = /(?![^\[]*\]|[^\{]*\})/) {
	return new RegExp(reg.source + negativeLookaheadForBrackets.source);
}

// Parse an object literal from string
// -----------------------------------
// - Builds a js object manually to avoid using eval() on the server.
// - Used for JS objects that don't conform to JSON spec. i.e. keys that aren't wrapped in a double-quote.
export default function parseStringData(str = '') {
  const strArrayMatch = str.match(/^\["(.*)"\]$/);
  if(strArrayMatch)
    return JSON.parse(str);

  let
		data = null;

	const
		dataMatch = str.match(_matchOutsideBrackets(/\[(.*)\]/)) || [],
		value = dataMatch[1];

	if (value) {
		// Regex split on all commas that aren't contained within curly/square brackets.
		// Use Array.reduce to reduce array down to a single object literal.
    //eslint-disable-next-line
		data = value.split(_matchOutsideBrackets(/\,/)).reduce( ( acc, item, i) => {

      let rawVal = item.trim();
			// Recursively check values for data or return a trimmed string
			const value = parseStringData(rawVal) || _formatValues( rawVal );
			acc[i] = value; // acc.push(parseDataFromString(val) || val);
			return acc;
		}, []);
	}

	return data || null;
};