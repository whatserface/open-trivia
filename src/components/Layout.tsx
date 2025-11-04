import { Flex, TabNav, Separator } from '@radix-ui/themes'
import { Outlet, useLocation, NavLink } from "react-router-dom"

const Layout = () => {
  const location = useLocation()
  return (
    <>
    <Flex align="center" direction="column" className="w-full p-6">
      <TabNav.Root color="orange" size="2">
        <TabNav.Link asChild active={location.pathname == "/"}>
          <NavLink to="/">Data</NavLink>
        </TabNav.Link>
        <Separator orientation="vertical" size="2" />
        <TabNav.Link asChild active={location.pathname == "/charts"}>
          <NavLink to="charts">Charts</NavLink>
        </TabNav.Link>
      </TabNav.Root>
      <Outlet />
    </Flex>
    </>
  )
}

export default Layout
