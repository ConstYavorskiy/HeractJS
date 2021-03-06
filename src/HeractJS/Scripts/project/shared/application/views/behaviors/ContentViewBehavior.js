/**
 * Developer: Stepan Burguchev
 * Date: 7/23/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([
    'coreui',
    '../content/ProfileButtonView',
    '../content/ProfilePanelView',
    '../ModuleLoadingView'
], function (
    core,
    ProfileButtonView,
    ProfilePanelView,
    ModuleLoadingView
) {
    'use strict';
    return Marionette.Behavior.extend({
        initialize: function (options, view) {
            core.utils.helpers.ensureOption(options, 'profileRegion');
            core.utils.helpers.ensureOption(options, 'moduleLoadingRegion');
            view.setModuleLoading = this.__setModuleLoading.bind(this);
        },

        onRender: function () {
            var profileRegion = this.view[this.options.profileRegion];
            var currentUser = window.application.currentUser;
            profileRegion.show(core.dropdown.factory.createPopout({
                customAnchor: true,
                buttonView: ProfileButtonView,
                buttonViewOptions: {
                    model: currentUser
                },
                panelView: ProfilePanelView,
                panelViewOptions: {
                    model: currentUser
                }
            }));
        },

        __setModuleLoading: function (isLoading) {
            var moduleLoadingRegion = this.view[this.options.moduleLoadingRegion];
            if (isLoading) {
                moduleLoadingRegion.show(new ModuleLoadingView());
            } else {
                moduleLoadingRegion.reset();
            }
        }
    });
});
