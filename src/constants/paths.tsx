export const HomePrefix = '/'
export const DashboardPrefix = HomePrefix + 'dashboard'

export const paths = {
  overview: DashboardPrefix + '/courses',
  courses: DashboardPrefix + '/courses/:id'
}
