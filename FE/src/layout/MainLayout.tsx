// import { Report } from '@mui/icons-material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BannerDetail from '../components/banners/BannerDetail';
import CreateBanner from '../components/banners/CreateBanner';
import UpdateBanner from '../components/banners/UpdateBanner';
import AddSectionInPage from '../components/pages/AddSectionInPage';
import CreatePage from '../components/pages/CreatePage';
import PageSection from '../components/pages/PageSection';
import UpdatePage from '../components/pages/UpdatePage';
import UpdateSectionInPage from '../components/pages/UpdateSectionInPage';
import AddBannerOnSection from '../components/section/AddBannerInSection';
import CreateSection from '../components/section/CreateSection';
import SectionDetail from '../components/section/SectionDetail';
import UpdateBannerOnSection from '../components/section/UpdateBannerInSection';
import UpdateSection from '../components/section/UpdateSection';
import CreateWebsite from '../components/websites/CreateWebsite';
import UpdateWebsite from '../components/websites/UpdateWebsite';
import AddBannerPopUpInPage from '../components/pages/AddBannerPopUpInPage';
import Banner from '../pages/Banner';
import PageManage from '../pages/PageManage';
import PageManageWebId from '../pages/PageManageWebId';
import Section from '../pages/Section';
import WebsiteManage from '../pages/WebsiteManage';
import Reports from '../pages/Report';
import Navbar from './Navbar';

const mdTheme = createTheme();

const MainLayout = (props: any) => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/*navbar*/}
        <Navbar />

        {/* main content here */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Switch>
            <Route exact path="/website" component={WebsiteManage} />
            <Route exact path="/website/add" component={CreateWebsite} />
            <Route exact path="/website/page" component={PageManageWebId} />
            <Route exact path="/website/update/:id" component={UpdateWebsite} />
            <Route exact path="/website/:id/page" component={PageManageWebId} />
            <Route exact path="/page" component={PageManage} />
            <Route exact path="/page/update/:id" component={UpdatePage} />
            <Route exact path="/page/add" component={CreatePage} />
            <Route exact path="/page/:id/section" component={PageSection} />
            <Route exact path="/section" component={Section} />
            <Route exact path="/section/create" component={CreateSection} />
            <Route exact path="/section/detail/:id" component={SectionDetail} />
            <Route exact path="/section/update/:id" component={UpdateSection} />
            <Route exact path="/page/add-section/:id" component={AddSectionInPage} />
            <Route exact path="/page/add-banner/:id" component={AddBannerPopUpInPage} />
            <Route
              exact
              path="/page/update-section/:id"
              component={UpdateSectionInPage}
            />
            <Route exact path="/section/add-banner/:id" component={AddBannerOnSection} />
            <Route
              exact
              path="/section/update-banner/:id"
              component={UpdateBannerOnSection}
            />
            <Route exact path="/banner" component={Banner} />
            <Route exact path="/banner/create" component={CreateBanner} />
            <Route exact path="/banner/detail/:id" component={BannerDetail} />
            <Route exact path="/banner/update/:id" component={UpdateBanner} />
            <Route path="/report" component={Reports} />
            <Route exact path="/">
              <Redirect to="/website" />
            </Route>
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
