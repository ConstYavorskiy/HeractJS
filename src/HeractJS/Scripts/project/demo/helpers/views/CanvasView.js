/**
 * Developer: Stepan Burguchev
 * Date: 8/14/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([
    'comindware/core',
    '../templates/canvas.hbs'
], function (core, template) {
    'use strict';

    return Marionette.LayoutView.extend({
        initialize: function (options) {
            core.utils.helpers.ensureOption(options, 'view');
        },

        template: template,

        regions: {
            view: '.js-view-region'
        },

        onShow: function () {
            if (this.options.canvas) {
                this.$el.css(this.options.canvas);
            }

            if (this.options.region) {
                this.listenTo(this.view, 'before:show', function () {
                    this.view.$el.css(this.options.region);
                }.bind(this));
            }

            this.view.show(this.options.view);
        }
    });
});
