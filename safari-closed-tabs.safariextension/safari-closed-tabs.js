/*

Safari-Closed-Tabs v0.1 (2015-08-07)
Copyright 2015 J Iceton (safariclosedtabs@emailbad.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

(function (){

var isPrivateWindow = false;

// test whether window is private - setItem will error if so
try {
    sessionStorage.setItem("privateTest", 1);
    sessionStorage.removeItem("privateTest");
}
catch(ex) {
    isPrivateWindow = true;
}

window.addEventListener("keypress", function(e) {
    if (e.metaKey && e.shiftKey && e.keyCode === 116) { // not sure why it ends up being 116
        safari.self.tab.dispatchMessage("reopen", null);
    }
}, true);

safari.self.addEventListener("message", function(msgEvent) {
    safari.self.tab.dispatchMessage("private", isPrivateWindow);
}, false);

})();