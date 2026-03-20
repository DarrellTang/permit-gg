#!/bin/bash
# Permit.GG Smoke Test — runs against a live dev server using playwright-cli
# Usage: ./scripts/smoke-test.sh [port]
# Requires: playwright-cli (npm install -g @playwright/cli)

PORT=${1:-3001}
BASE="http://localhost:$PORT"
PASS=0
FAIL=0
SCREENSHOTS="/tmp/permit-gg-smoke"
mkdir -p "$SCREENSHOTS"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " PERMIT.GG SMOKE TEST — port $PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if ! curl -s -o /dev/null -w "%{http_code}" "$BASE" | grep -q "200"; then
  echo "FAIL: Dev server not running on port $PORT"
  exit 1
fi

playwright-cli open "$BASE" > /dev/null 2>&1

get_snapshot() {
  local output
  output=$(playwright-cli snapshot --filename=".playwright-cli/smoke-snap.yml" 2>&1)
  cat .playwright-cli/smoke-snap.yml 2>/dev/null
}

check() {
  local name="$1"
  local result="$2"
  if [ "$result" = "true" ]; then
    echo "  ✓ $name"
    PASS=$((PASS + 1))
  else
    echo "  ✗ $name"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "## Landing Page"
playwright-cli goto "$BASE" > /dev/null 2>&1
sleep 2
SNAP=$(get_snapshot)
check "Landing page loads" "$(echo "$SNAP" | grep -q 'PERMIT.GG' && echo true || echo false)"
check "Hero heading exists" "$(echo "$SNAP" | grep -q 'DOMINATE' && echo true || echo false)"
check "Start Your Quest CTA exists" "$(echo "$SNAP" | grep -q 'START YOUR QUEST' && echo true || echo false)"
playwright-cli screenshot --filename="$SCREENSHOTS/landing.png" > /dev/null 2>&1

echo ""
echo "## Dashboard"
playwright-cli goto "$BASE/dashboard" > /dev/null 2>&1
sleep 2
SNAP=$(get_snapshot)
check "Dashboard loads" "$(echo "$SNAP" | grep -q 'Welcome to PERMIT.GG' && echo true || echo false)"
check "Sidebar navigation visible" "$(echo "$SNAP" | grep -q 'Practice' && echo true || echo false)"
check "Quick Practice card" "$(echo "$SNAP" | grep -q 'Quick Practice' && echo true || echo false)"
check "Simulated Test card" "$(echo "$SNAP" | grep -q 'Simulated Test' && echo true || echo false)"
playwright-cli screenshot --filename="$SCREENSHOTS/dashboard.png" > /dev/null 2>&1

echo ""
echo "## Practice Quiz — Pre-start"
playwright-cli goto "$BASE/practice" > /dev/null 2>&1
sleep 2
SNAP=$(get_snapshot)
check "Practice page loads" "$(echo "$SNAP" | grep -q 'Practice Quiz' && echo true || echo false)"
check "Question count shown" "$(echo "$SNAP" | grep -q '15' && echo true || echo false)"
check "Start Practice button" "$(echo "$SNAP" | grep -q 'Start Practice' && echo true || echo false)"
check "Gear config icon" "$(echo "$SNAP" | grep -q 'Configure question count' && echo true || echo false)"

echo ""
echo "## Practice Quiz — Active"
playwright-cli run-code "async page => { await page.getByText('Start Practice').click({ force: true }); await page.waitForTimeout(3000); }" > /dev/null 2>&1
SNAP=$(get_snapshot)
check "Quiz started" "$(echo "$SNAP" | grep -q 'Question 1 of' && echo true || echo false)"
check "Answer options visible" "$(echo "$SNAP" | grep -qE 'button.*\"[ABCD] ' && echo true || echo false)"
check "Submit button exists" "$(echo "$SNAP" | grep -q '"Submit"' && echo true || echo false)"
check "Quit button exists" "$(echo "$SNAP" | grep -q 'Quit quiz' && echo true || echo false)"
playwright-cli screenshot --filename="$SCREENSHOTS/quiz-active.png" > /dev/null 2>&1

echo ""
echo "## Practice Quiz — Answer + Feedback"
playwright-cli run-code "async page => {
  const opts = page.locator('button[class*=rounded-xl]:not([disabled])');
  await opts.first().click();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
}" > /dev/null 2>&1
SNAP=$(get_snapshot)
check "Answer revealed" "$(echo "$SNAP" | grep -qE 'Next|Finish|Question 2' && echo true || echo false)"
playwright-cli screenshot --filename="$SCREENSHOTS/quiz-feedback.png" > /dev/null 2>&1

echo ""
echo "## Simulated Test"
playwright-cli goto "$BASE/simulated-test" > /dev/null 2>&1
sleep 3
SNAP=$(get_snapshot)
check "Sim test loads" "$(echo "$SNAP" | grep -q 'Question 1 of 46' && echo true || echo false)"
check "SIM badge visible" "$(echo "$SNAP" | grep -q 'SIM' && echo true || echo false)"
check "Flag button exists" "$(echo "$SNAP" | grep -qi 'flag' && echo true || echo false)"
playwright-cli screenshot --filename="$SCREENSHOTS/sim-test.png" > /dev/null 2>&1

playwright-cli close > /dev/null 2>&1

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " RESULTS: $PASS passed, $FAIL failed"
echo " Screenshots: $SCREENSHOTS/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $FAIL
