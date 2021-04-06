# KfW Checkliste Baukindergeld

Die folgende Anleitung beschreibt, wie die *KfW Checkliste Baukindergeld* Anwendung mittels eines iframes in eine Webseite eingebunden werden kann.

Eine voll funktionsfähige Demo der Anwendung ist hier zu sehen:

[https://kfw-checkliste-baukindergeld.c3muc.io/](https://kfw-checkliste-baukindergeld.c3muc.io/)

Eine beispielhafte Einbindung der Anwendung mittels iframe ist hier zu sehen:

[https://kfw-checkliste-baukindergeld.c3muc.io/iframe.html](https://kfw-checkliste-baukindergeld.c3muc.io/iframe.html)

## Installation

Die Anwendung wird als ZIP-Paket bereitgestellt. Um diese auf einem Webserver zu installieren, entpacken Sie zunächst das bereitgestellt ZIP-Paket und laden dessen Inhalt anschließend auf einen öffentlich zugänglichen Pfad Ihres Webservers hoch.

Die Anwendung verwendet ausschließlich relative Pfade zur Referenzierung sämtlicher Dateien, entsprechend sind keinerlei Anpassungen nötig, so lange Sie die ursprüngliche Datei- & Verzeichnisstruktur intakt halten.

## Einbindung

Sie können die Anwendung mittels eines iframes in eine Webseite einbinden. Es wird empfohlen den iframe in einen Full-Width-Container zu platzieren, um ein optimales responsives Verhalten der Anwendung innerhalb des iframes zu ermöglichen. Die von der Anwendung unterstütze Mindestbreite beträgt 375px für Phone Portrait, die Maximalbreite kann für Desktop Large optional auf 1200px limitiert werden.

Um die Höhe des iframes dynamisch an den Inhalt der Anwendung anzupassen, wird zusätzlich die Verwendung von [iFrame Resizer](http://davidjbradshaw.github.io/iframe-resizer/) empfohlen. Das entsprechende Script wird hierfür standardmäßig in der `index.html` referenziert, ist jedoch vollkommen optional und kann jederzeit entfernt werden.

Ein vollständiges Beispiel der empfohlenen Einbindung können Sie der im ZIP-Paket enthaltenen `iframe.html` entnehmen.
