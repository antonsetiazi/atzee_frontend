// src/core/bootstrap/services/user.bootstrap.ts

import { AuthBootstrap } from "./auth.bootstrap";
import { PermissionsBootstrap } from "./permissions.bootstrap";
import { PagesBootstrap } from "./pages.bootstrap";
import { NavigationBootstrap } from "./navigation.bootstrap";

export async function runUserBootstrap() {
    await AuthBootstrap();
    await PermissionsBootstrap();
    await PagesBootstrap();
    await NavigationBootstrap();
}
