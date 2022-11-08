/*
 * Copyright (C) 2012-2022  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import * as DynamicHelp from "react-dynamic-help";

import * as data from "data";

import { GuestUserIntroEXV6 } from "./GuestUserIntroEXV6";
import { GuestUserIntroOldNav } from "./GuestUserIntroOldNav";
import { GuestUserIntroRengo } from "./GuestUserIntroRengo";

/**
 * This component is a handy wrapper for all the Help Flows, and reset on login/logout
 *
 * When the logged-in user changes, we have to wait till we see the new state loaded, then update the help system with it
 */

export function HelpFlows(): JSX.Element {
    const {
        enableHelp,
        triggerFlow,
        getSystemStatus: helpSystemStatus,
    } = React.useContext(DynamicHelp.Api);

    // Turn off RDH when they log out.
    React.useEffect(() => {
        const updateHelpState = () => {
            const user = data.get("config.user");
            if (user?.anonymous) {
                enableHelp(false);
            }
        };

        data.events.on("remote_data_sync_complete", updateHelpState);

        return () => {
            data.events.off("remote_data_sync_complete", updateHelpState);
        };
    }, [enableHelp]);

    // Here is the place to do login-time help flow actions: after help system is ready

    React.useEffect(() => {
        if (helpSystemStatus().initialized) {
            const linked_challenge = data.get("challenge_link_registration", null);
            if (linked_challenge) {
                if (linked_challenge.rengo) {
                    triggerFlow("guest-user-intro-rengo");
                }

                if (data.get("experiments.v6") === "enabled") {
                    triggerFlow("guest-user-intro-exv6");
                } else {
                    triggerFlow("guest-user-intro-old-nav");
                }
                data.set("challenge_link_registration", null);
            }
        }
    });

    return (
        <>
            <GuestUserIntroEXV6 />

            <GuestUserIntroOldNav />

            <GuestUserIntroRengo />
        </>
    );
}