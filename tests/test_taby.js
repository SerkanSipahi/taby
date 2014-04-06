describe('Testing DomElement Helpers Methods...', function() {

    'use strict';

    describe('Testing pattern for domNode.$closest - allPattern', function(){

        var allPattern     = /^(\*)?(.*?)(:until\((.*?)\))?$/;

        it('Test: *li:until(.taby)', function() {
            var element = allPattern.exec('*li:until(.taby)');
            expect(element).toContain('*');
            expect(element).toContain('li');
            expect(element).toContain('.taby');
        });
        it('Test: *li', function() {
            var element = allPattern.exec('*li');
            expect(element).toContain('*');
            expect(element).toContain('li');
        });
        it('Test: *li.class:until(#root)', function() {
            var element = allPattern.exec('*li.class:until(#root)');
            expect(element).toContain('*');
            expect(element).toContain('li.class');
            expect(element).toContain('#root');
        });
        it('Test: *li.class', function() {
            var element = allPattern.exec('*li.class');
            expect(element).toContain('*');
            expect(element).toContain('li.class');
        });
        it('Test: li.class:until(#root)', function() {
            var element = allPattern.exec('li.class:until(#root)');
            expect(element).not.toContain('*');
            expect(element).toContain('li.class');
            expect(element).toContain('#root');
        });
        it('Test: *li[data-foo="true"].class:until(.somclass)', function() {
            var element = allPattern.exec('*li[data-foo="true"].class:until(.someclass)');
            expect(element).toContain('*');
            expect(element).toContain('li[data-foo="true"].class');
            expect(element).toContain('.someclass');
        });

        /*
         * element[1] = all,
         * element[2] = parentNode,
         * element[4] = untilElement
         **/

        it('Test: *li[data-foo="true"].class:until(.somclass)', function() {
            var element = allPattern.exec('*li[data-foo="true"].class:until(.somclass)');
            expect(element[1]).toBe('*');
            expect(element[2]).toBe('li[data-foo="true"].class');
            expect(element[4]).toBe('.somclass');
        });
        it('Test: li[data-foo="true"].class:until(.somclass)', function() {
            var element = allPattern.exec('li[data-foo="true"].class:until(.somclass)');
            expect(element[1]).not.toBeDefined();
            expect(element[2]).toBe('li[data-foo="true"].class');
            expect(element[4]).toBe('.somclass');
        });
        it('Test: li[data-foo="true"].class', function() {
            var element = allPattern.exec('li[data-foo="true"].class');
            expect(element[1]).not.toBeDefined();
            expect(element[2]).toBe('li[data-foo="true"].class');
            expect(element[4]).not.toBeDefined();
        });


    });

});

