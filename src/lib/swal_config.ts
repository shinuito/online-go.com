/*
 * Copyright (C)  Online-Go.com
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

import { _ } from "translate";
import Swal from "sweetalert2";

/*** SweetAlert setup ***/

/* (see ogs.style for global swal styling) */

export const alert = Swal.mixin({
    customClass: {
        confirmButton: "primary",
        cancelButton: "reject",
    },
    buttonsStyling: false,
    reverseButtons: true,
    confirmButtonText: _("OK"),
    cancelButtonText: _("Cancel"),
    allowEscapeKey: true,
});

(window as any)["swal"] = alert;
