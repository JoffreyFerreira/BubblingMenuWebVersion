# BubblingMenuWebVersion

OZENDA Thomas - FERREIRA Joffrey 

Nous avons refait le bubbling menu en html, css car nous buttions en Java et que c'est beaucoup plus simple en web

Le mode "bubbling" s'active en maintenant le touche "CTRL" enfoncée.

Lien utlisé pour générer le menu :
https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp

La bulle est tracée avec un canvas html où le rayon est calculé pour toucher le bord de l'item le plus proche. Elle est superposé au menu grâce au css.
Les calculs d'item le plus proche et la gestion d'évènements sont faits en JS. 