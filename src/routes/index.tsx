import React, { createElement, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fallback from 'Components/fallback';
import { routeConfig } from './config';

export interface RouteConfig {
  routePath: string;
  componentPath: string;
  children?: RouteConfig[];
  permissionKey?: string;
}

const renderRoutes = (routes: RouteConfig[]) => {
  const permissions: Set<string> = new Set([]);
  return routes.map(({ routePath, componentPath, permissionKey, children }) => {
    if (permissionKey && !permissions.has(permissionKey)) return null;
    const Element = (
      <Suspense fallback={<Fallback />}>{createElement(lazy(() => import(`Pages/${componentPath}`)))}</Suspense>
    );
    return (
      <Route key={routePath} path={routePath} element={Element}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
};

const RootRouter = () => (
  <BrowserRouter>
    <Routes>{renderRoutes(routeConfig)}</Routes>
  </BrowserRouter>
);

export default RootRouter;
