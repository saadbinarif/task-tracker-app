let usePosgres = process.argv[2] === '--database' && process.argv[3] === 'posgres';

module.exports = usePosgres