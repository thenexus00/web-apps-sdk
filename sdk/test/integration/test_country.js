/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/
describe("Check country model collection integration.", function() {
    beforeEach(function() {
        BCAPI.Helper.Test.runTestServer();
    });
    
    it("Check country listing works as expected.", function() {
    	var countryCollection = new BCAPI.Models.CountryCollection(),
    		fetchedCollection = undefined,
    		foundCountries = {};
    	
    	runs(function() {
    		countryCollection.fetch({
    			success: function(countries) {
    				fetchedCollection = countries;
    			}
    		});    		
    	});
    	
    	waitsFor(function() {
    		return fetchedCollection;
    	}, "List of countries not fetched.", 2000);
    	
    	runs(function() {
			expect(fetchedCollection.length).toBe(241);
    					
    		fetchedCollection.each(function(country) {
    			foundCountries[country.get("countryCode")] = country.get("displayName");
    		});
    		    	
    		expect(foundCountries.AU).toBe("Australia");
    		expect(foundCountries.RO).toBe("Romania");
    		expect(foundCountries.US).toBe("United States");
    	});
    });
});