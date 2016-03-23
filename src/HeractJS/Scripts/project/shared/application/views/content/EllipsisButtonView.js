/**
 * Developer: Stepan Burguchev
 * Date: 7/15/2015
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
    '../../templates/content/ellipsisButton.hbs'
], function (core, template) {
    'use strict';
    return Marionette.ItemView.extend({
        initialize: function () {
        },

        className: 'top-nav-more',

        template: template,

        behaviors: {
            CustomAnchorBehavior: {
                behaviorClass: core.dropdown.views.behaviors.CustomAnchorBehavior,
                anchor: '.js-anchor'
            }
        }
    });
});
