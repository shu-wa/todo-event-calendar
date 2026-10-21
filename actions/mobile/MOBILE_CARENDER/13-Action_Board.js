// Extracted for reading; the platform provides $ui, $fn, $param and SQL functions.
export default async function run() {
$param.searchValue = $ui.todo_search.value;

$fn.nextUI('MOBILE_CARENDER');
}
