/**
 * Developer: Stepan Burguchev
 * Date: 7/1/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([
    '../../templates/content/tabItem.hbs'
], function (template) {
        'use strict';

        var classes = {
            SELECTED: 'top-nav__i_selected'
        };

        return Marionette.ItemView.extend({
            initialize: function () {
            },

            modelEvents: {
                'selected': '__updateSelected',
                'deselected': '__updateSelected',
                'change': 'render'
            },
            
            className: 'top-nav__i',

            template: template,

            onRender: function () {
                this.__updateSelected();
            },

            __updateSelected: function () {
                this.$el.toggleClass(classes.SELECTED, Boolean(this.model.selected));
            }
        });
    });
