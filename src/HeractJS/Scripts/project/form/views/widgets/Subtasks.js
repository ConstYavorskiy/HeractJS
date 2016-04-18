/**
 * Developer: Roman Shumskiy
 * Date: 01/10/2014
 * Copyright: 2010-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, _ */

define(['form/App', 'form/templates/widgets/subtasks.html'],
    function (App, itemTmpl) {
        'use strict';
        return Marionette.ItemView.extend({
            initialize: function () {
                this.setHiddenClassNameIfNeeded();
                _.bindAll(this, "template");
                this.render();
            },
            className: 'card__i',
            onRender: function(){
                this.$el.addClass(this.className);
            },
            template: Handlebars.compile(itemTmpl),
            events: {
                'click': 'showSubTasks'
            },
            setHiddenClassNameIfNeeded: function () {
                this.isVisible = this.model.get('isVisible');
                !this.isVisible && (this.className += ' hidden');
            },
            showSubTasks: function () {
                App.FormMediator.updateItem(false, {
                    type: 'subtasks'
                });
            }
        });
    });
