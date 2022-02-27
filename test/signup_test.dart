// ignore_for_file: prefer_const_constructors

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:touchofbeauty_flutter/screens/signup_screen.dart';

void main() {
  testWidgets("testing a formfield of signup screen",
      (WidgetTester tester) async {
    final passwordfield = find.byKey(ValueKey('password'));
    final button = find.byKey(ValueKey('Button'));

    await tester.pumpWidget(MaterialApp(home: SignUpScreen()));
    await tester.enterText(passwordfield, "niman");
    await tester.tap(button);
    await tester.pump();

    expect(find.text('niman'), findsWidgets);
  });
}
