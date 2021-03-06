/**
 * Developer: Stepan Burguchev
 * Date: 7/8/2015
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
    '../../templates/content/profileButton.hbs'
], function (core, template) {
    'use strict';
    return Marionette.ItemView.extend({
        initialize: function () {
        },

        className: 'top-nav-person',

        behaviors: {
            CustomAnchorBehavior: {
                behaviorClass: core.dropdown.views.behaviors.CustomAnchorBehavior,
                anchor: '.js-anchor'
            }
        },

        template: template
    });
});
