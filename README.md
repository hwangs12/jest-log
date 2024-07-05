Structure of a properly written unit test:
AAA principles: - arrange - act - assert

    Setup

    Teardown

### INTERMEDIATE TESTING TOPICS

-   FIRST PRINCIPLES
-

### FIRST

-   FAST
    -   FASTER TESTES - FASTER FEEDBACK
    -
-   INDEPENDENT
    -   ISOLATE FROM OTHER OTHER TESTS
    -   EXTERNAL ENVIRONMENT
    -   NO SHARED STATE WITH OTHER TESTS
    -   THE ORDER IN WHICH TESTS RUN SHOULD NOT MATTER
    -   CONTRADICTION WITH IT: INDIVIDUAL TESTS TAKE MORE
        TIME TO SET UP
-   REPEATABLE
    -   SAME RESULT WITH THE SAME INPUT
    -   CHALLENGE: RANDOM/DATE VALUES WE WILL OFTEN MOCK THESE
    -   EXAMPLE: TEST THAT WRITES TO A DATABASE:
        -   IT SHOULD ALWAYS CLEAN UP
    -   IN CONTRADICTION WITH FAST:
        -   MORE SETUP AND TEARDOWN OPERATIONS
-   SELF-VALIDATING
    -   after the test is finished, its result should be clear
    -   either pass/fail
-   THOROUGH
    -   cover all the cases/paths/scenarios
    -   hard to think at all of them from the beginning
    -   happy cases, bad paths, edge cases
    -   invalid output
    -   large values
    -   100% code coverage - not a great indicator

## Test Doubles in jest

-   what they are and why we need thpem

## WHY WE NEED TEST DOUBLES?

-   SOME UNITS AREN'T FAST, OR EASILY ACCESSIBLE
    -   REPLACE THEM IN TESTS:

REQUEST -> MACHINE -> TEST DB OR DATABASE
what are test doubles?

-   pretend objects used ni place of a real object for testing purposes
-   dummy objecs: passed around but not true
    fakes: implified working implementation it takes a
