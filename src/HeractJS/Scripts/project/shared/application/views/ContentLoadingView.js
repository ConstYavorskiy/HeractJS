/**
 * Developer: Stepan Burguchev
 * Date: 6/30/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define(['../templates/contentLoading.hbs'],
    function (template) {
        'use strict';
        return Marionette.ItemView.extend({
            initialize: function () {
            },

            template: template,

            className: 'loader'
        });
    });
