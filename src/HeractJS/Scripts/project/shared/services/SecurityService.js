/**
 * Developer: Stepan Burguchev
 * Date: 8/07/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([],
    function () {
        'use strict';

        var globalPermissions = {
            SYSTEM_ADMINISTRATION: 'system_administration',
            USER_MANAGEMENT: 'cmw.privilege.manageAccounts',
            APP_DESIGN: 'cmw.privilege.designSystem',
            DEFAULT_USER: 'default_user'
        };

        return {
            initialize: function (options) {
            },

            hasGlobalPermission: function (permissionId) {
                return true;
/*
                var globalPermissions = Context.configurationModel.GlobalPermissions;
                if (globalPermissions) {
                    var hasPermision = globalPermissions.filter(function(permission) {
                        if (permission === permissionId) {
                            return true;
                        }
                    });

                    if (hasPermision.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
*/
            },

            globalPermissions: globalPermissions
        };
    });
