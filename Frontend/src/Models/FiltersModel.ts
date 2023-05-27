// Instead pass raw values from filter checkboxes, we use enum to avoid bugs/improve security 
// Used in Home component
enum Filters {
    IS_FOLLOWING = 'isFollowing',
    ACTUAL_VACATIONS = 'actualVacations',
    STARTED_VACATIONS = 'startedVacations',
}

export default Filters;