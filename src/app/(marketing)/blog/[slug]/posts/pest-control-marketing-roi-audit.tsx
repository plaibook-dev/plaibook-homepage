export default function PestControlMarketingRoiAudit() {
  return (
    <>
      <p className="text-text-secondary leading-relaxed mb-4">
        Your marketing agency just sent over the monthly report. Five hundred
        leads generated. Cost per lead: $20. The charts look great. Everyone on
        their side is high-fiving.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        But here&apos;s the question nobody wants to ask: how many of those 500
        &ldquo;leads&rdquo; turned into paying customers?
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        If you&apos;re like most pest control companies, you don&apos;t actually
        know. You know you spent $10,000 on marketing last month. You know the
        phone rang a lot. But the connection between ad dollars and closed
        revenue? That&apos;s a black box.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        This isn&apos;t an article about firing your agency. Most marketing
        agencies in the pest control space are doing good work. But good work
        without accountability still leaks budget. And that leak adds up fast.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Here&apos;s how to audit your lead quality, figure out what your
        marketing is actually producing, and have a productive conversation with
        your agency about the numbers.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        The lead quality problem
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        When a marketing agency reports &ldquo;500 leads,&rdquo; what does that
        actually mean? In most cases, it means 500 phone calls or form
        submissions that came through a tracked number or landing page. That
        sounds straightforward until you start looking at what&apos;s in those
        calls.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Here&apos;s what we consistently see when pest control companies start
        listening to the calls their agencies count as &ldquo;leads&rdquo;:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
        <li>
          <strong>Existing customers</strong> calling about service issues,
          billing questions, or schedule changes. These are customer service
          calls, not new business.
        </li>
        <li>
          <strong>Wrong numbers and spam.</strong> Robocalls, people looking for
          a different company, misdials. They all count as &ldquo;leads&rdquo;
          if they hit the tracking number.
        </li>
        <li>
          <strong>Tire-kickers</strong> who ask for a price, say
          &ldquo;thanks,&rdquo; and never call back. The call happened. The
          intent wasn&apos;t there.
        </li>
        <li>
          <strong>Duplicate contacts</strong> counted across multiple channels.
          The same person clicked a Google ad on Monday and a Facebook ad on
          Thursday. That&apos;s one prospect, but it shows up as two leads.
        </li>
        <li>
          <strong>Form fills with bad info.</strong> Fake phone numbers,
          unmonitored email addresses, people who fill out a form but never
          answer when you call back.
        </li>
      </ul>
      <p className="text-text-secondary leading-relaxed mb-4">
        None of this is necessarily your agency&apos;s fault. Most agencies
        report on what they can measure: clicks, calls, form fills. They
        don&apos;t have visibility into what happens after the phone rings. They
        don&apos;t know if your rep closed the deal, fumbled the call, or if the
        &ldquo;lead&rdquo; was Mrs. Johnson calling about a billing error.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        When nobody tracks what happens after the click, both sides are flying
        blind. Your agency optimizes for volume. You pay for volume. And the
        actual revenue impact remains a mystery.
      </p>
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-text-secondary">
        &ldquo;My guys tell me the leads suck. Now I can go back with actual
        numbers &mdash; &lsquo;No, here&apos;s why they&apos;re not
        closing.&rsquo;&rdquo;
        <strong className="not-italic text-text-primary block mt-2 text-sm">
          &mdash; Atlas Pest
        </strong>
      </blockquote>
      <p className="text-text-secondary leading-relaxed mb-4">
        The instinct in most pest control companies is to blame the leads. And
        sometimes the leads are bad. But sometimes the leads are fine and the
        problem is on the sales side. Without data connecting the lead source
        to the call outcome, you can&apos;t tell the difference.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        The attribution gap
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        Most pest control companies have a massive gap between their marketing
        data and their revenue data.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Your agency knows how many clicks you got. Your CRM (maybe) knows which
        customers signed up. But connecting a specific Google Ads campaign to a
        specific phone call to a specific sales outcome to a specific dollar
        amount? Almost nobody in pest control is doing that.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Jeff Davis, CEO of CoalmarchGorillaDesk, put it this way:
      </p>
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-text-secondary">
        &ldquo;Lead attribution and buyer journey &mdash; a sales CRM should
        solve that, and they don&apos;t exist in this market. Solving for all
        three in one is pretty freaking brilliant.&rdquo;
        <strong className="not-italic text-text-primary block mt-2 text-sm">
          &mdash; Jeff Davis, CoalmarchGorillaDesk
        </strong>
      </blockquote>
      <p className="text-text-secondary leading-relaxed mb-4">
        He&apos;s right. The pest control industry has CRMs that track
        customers. It has marketing tools that track clicks. But almost nothing
        connects the two in a way that tells you: &ldquo;This $10,000 in Google
        Ads spend produced $47,000 in closed revenue, while this $10,000 in LSA
        spend produced $62,000.&rdquo;
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Without that connection, you&apos;re making budget decisions based on
        lead volume, not revenue. And lead volume is a vanity metric.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Think about it this way: would you rather have a channel that produces
        200 leads at $25 each, or a channel that produces 80 leads at $60 each?
        Most people instinctively pick the first option. But if the 200 leads
        close at 5% with an average ticket of $300, that&apos;s $3,000 in
        revenue from $5,000 in spend. If the 80 leads close at 20% with an
        average ticket of $500, that&apos;s $8,000 in revenue from $4,800 in
        spend. The &ldquo;expensive&rdquo; leads are dramatically more
        profitable.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        You can&apos;t see this if you only measure cost per lead.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        A framework for auditing your marketing lead quality
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        Whether you&apos;re spending $5K or $50K a month on marketing, here is a
        straightforward process for figuring out what you&apos;re actually
        getting. You don&apos;t need special software for the first few steps.
        You just need discipline and a spreadsheet.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Step 1: Define what counts as a &ldquo;lead&rdquo;
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        This sounds obvious, but it&apos;s where most agency relationships go
        sideways. Your agency&apos;s definition of a lead and your definition of
        a lead are probably different.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Sit down with your agency and agree on what counts. A good starting
        point:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
        <li>
          A lead is a <strong>new prospect</strong> (not an existing customer)
          who contacts you about a <strong>service you offer</strong> in a{" "}
          <strong>geography you serve</strong>.
        </li>
        <li>
          Existing customer calls are <strong>not</strong> leads.
        </li>
        <li>
          Wrong numbers, spam, and vendor calls are <strong>not</strong> leads.
        </li>
        <li>
          A person who contacts you through multiple channels is{" "}
          <strong>one</strong> lead, not three.
        </li>
      </ul>
      <p className="text-text-secondary leading-relaxed mb-4">
        Get this in writing. Put it in the contract or at least in an email you
        can reference. When you&apos;re both working from the same definition,
        the monthly reports become immediately more useful.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        This single step will typically cut reported lead counts by 20-40%. That
        sounds scary, but it&apos;s not. You&apos;re not losing leads. You&apos;re
        seeing reality.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Step 2: Track call outcomes, not just call volume
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        Knowing that the phone rang 500 times tells you almost nothing. What
        happened on those calls?
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        At minimum, you need to track every inbound call with one of these
        outcomes:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-text-secondary mb-6">
        <li>
          <strong>Booked:</strong> New customer, appointment set or service sold
          on the call.
        </li>
        <li>
          <strong>Quote given, pending:</strong> Prospect is interested but
          didn&apos;t commit. Needs follow-up.
        </li>
        <li>
          <strong>Not qualified:</strong> Out of service area, service we
          don&apos;t offer, commercial account when you only do residential, etc.
        </li>
        <li>
          <strong>Existing customer:</strong> Already in your system, calling
          about an existing service.
        </li>
        <li>
          <strong>No contact:</strong> Call went to voicemail, was abandoned, or
          nobody answered.
        </li>
        <li>
          <strong>Junk:</strong> Spam, wrong number, solicitor.
        </li>
      </ol>
      <p className="text-text-secondary leading-relaxed mb-4">
        If your reps aren&apos;t dispositing calls today, start there. It takes
        five seconds per call and it completely changes how you evaluate
        marketing. Without call outcomes, you&apos;re judging your marketing by
        the number of times the phone rang. That&apos;s like judging a
        restaurant by how many people walked past it.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Step 3: Calculate cost per sale, not cost per lead
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        This is the metric that actually matters. Your agency will report cost
        per lead (CPL). That&apos;s fine as a secondary metric. But the number
        you should be running your business on is cost per sale (CPS), sometimes
        called cost per acquisition (CPA).
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        The math is simple:
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        <strong>Cost Per Sale = Total Marketing Spend / Number of New Customers
        Acquired</strong>
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        If you spent $10,000 on Google Ads and got 500 &ldquo;leads&rdquo; but
        only 40 of those became paying customers, your cost per sale is $250.
        Your agency will tell you your cost per lead is $20. Both numbers are
        technically correct. Only one of them tells you whether you&apos;re
        making money.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Take it one step further and calculate your{" "}
        <strong>marketing ROI by channel</strong>:
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        <strong>Marketing ROI = (Revenue from Channel - Spend on Channel) /
        Spend on Channel</strong>
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        A channel that costs $10,000 and produces $50,000 in first-year revenue
        has a 4x ROI. A channel that costs $5,000 and produces $8,000 has a
        0.6x ROI. If you&apos;re only looking at cost per lead, these might look
        equally good. They&apos;re not.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Step 4: Compare lead sources head-to-head on actual revenue
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        Once you&apos;re tracking call outcomes and tying them to revenue, you
        can finally answer the question every pest control owner wants answered:
        where should I spend my next dollar?
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Build a simple comparison table. For each lead source (Google Ads, LSA,
        Yelp, Facebook, direct mail, referral, organic), track:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
        <li>Total spend</li>
        <li>Total leads (using your agreed definition)</li>
        <li>Total sales closed</li>
        <li>Close rate (sales / leads)</li>
        <li>Total revenue from those sales</li>
        <li>Cost per sale</li>
        <li>Revenue per dollar spent</li>
      </ul>
      <p className="text-text-secondary leading-relaxed mb-4">
        When you look at this table, the answers jump off the page. You&apos;ll
        see that one channel delivers cheap leads that rarely close. Another
        delivers expensive leads that close at 3x the rate with bigger tickets.
        A third delivers moderate leads but your reps hate them and let them
        go to voicemail.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        That third scenario is more common than you&apos;d think. Sometimes the
        problem isn&apos;t the lead source. It&apos;s the way your team handles
        leads from that source. A channel that produces great leads is worthless
        if your reps have decided those leads are junk and stopped trying.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        Red flags your agency may be inflating numbers
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        Let me be clear: most marketing agencies aren&apos;t deliberately
        scamming you. But incentive structures matter. Agencies are typically
        evaluated on lead volume, so they optimize for lead volume. When that
        happens, certain patterns emerge.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Watch for these:
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        1. Existing customer calls counted as leads
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        This is the biggest one. If your agency uses call tracking on your main
        business number, every inbound call gets counted. Mrs. Johnson calling
        to reschedule her quarterly treatment? That&apos;s a &ldquo;lead.&rdquo;
        The customer asking why there are still ants after yesterday&apos;s
        treatment? Also a &ldquo;lead.&rdquo;
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Depending on the size of your existing customer base, this can inflate
        lead counts by 30-50%. It also makes your cost per lead look
        phenomenally good, because a huge chunk of those &ldquo;leads&rdquo;
        were going to call you whether you spent money on marketing or not.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        2. Form fills that never answer the phone
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        A form submission is only a lead if there&apos;s a real person behind
        it. If someone fills out a &ldquo;Get a Free Quote&rdquo; form and then
        never answers the phone, never responds to an email, and the phone
        number goes to a disconnected line, that&apos;s not a lead. It&apos;s a
        data point.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Ask your agency what percentage of form fills result in actual
        conversations. If they don&apos;t know, that tells you something.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        3. Double-counting across channels
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        A homeowner sees your Facebook ad on Monday, Googles your company name
        on Wednesday, clicks a Google Ad, and calls you. Both Facebook and
        Google get credit for a &ldquo;lead.&rdquo; Your total report says two
        leads. You got one prospect.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Multi-touch attribution is a real problem and there&apos;s no perfect
        solution. But at minimum, your agency should be able to de-duplicate by
        phone number or address. If they&apos;re reporting raw counts from each
        platform without de-duplication, the numbers are inflated.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        4. Counting calls under 60 seconds
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        A 15-second phone call is not a lead. It&apos;s a wrong number, a hang
        up, or someone who hit the wrong button on their phone. Some agencies
        count every call that connects to a tracking number, regardless of
        duration. Ask what their minimum call duration is for counting a lead.
        Industry best practice is at least 60 seconds, though even that can
        include a lot of non-leads.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        5. Vanity metrics dominating the report
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        If your monthly report leads with impressions, click-through rates, and
        &ldquo;engagement&rdquo; before it gets to actual leads and sales, be
        cautious. These metrics aren&apos;t useless, but they&apos;re input
        metrics, not output metrics. You don&apos;t pay your technicians with
        impressions.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        A good agency report should lead with: new customers acquired, revenue
        generated, cost per acquisition. Then it should show the supporting
        metrics that explain how they got there.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        How to have the conversation with your agency
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        You&apos;ve done the audit. You&apos;ve found discrepancies. The
        temptation is to call your agency rep and lay into them. Don&apos;t.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Here&apos;s why: a good marketing agency is hard to find, and the
        problem usually isn&apos;t bad intentions. It&apos;s misaligned
        incentives and missing data. Fix those two things and you&apos;ll get
        dramatically better results from the same agency.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Lead with data, not accusations
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        Instead of &ldquo;Your leads are garbage,&rdquo; try: &ldquo;We tracked
        call outcomes on last month&apos;s leads. Of the 500 reported, 180 were
        existing customers, 45 were wrong numbers, and 90 never answered when
        we called back. That leaves about 185 actual new prospect conversations,
        of which we closed 35. Can we work together to improve those
        numbers?&rdquo;
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        That conversation is productive. It gives the agency something specific
        to work with. It also shows them you&apos;re paying attention, which
        tends to improve performance all by itself.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Agree on new reporting standards
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        Once you&apos;ve established a shared definition of what counts as a
        lead, ask your agency to report on those numbers going forward. Request
        a monthly report that includes:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
        <li>
          <strong>Qualified leads</strong> (using your agreed definition)
        </li>
        <li>
          <strong>Cost per qualified lead</strong>
        </li>
        <li>
          <strong>Closed sales from marketing leads</strong> (you&apos;ll need
          to provide this number)
        </li>
        <li>
          <strong>Cost per sale</strong>
        </li>
        <li>
          <strong>Revenue generated</strong> (again, your data)
        </li>
        <li>
          <strong>Return on ad spend</strong>
        </li>
      </ul>
      <p className="text-text-secondary leading-relaxed mb-4">
        Notice that some of these require data from your side. This is a
        partnership. If you want your agency to optimize for revenue instead of
        volume, you need to share revenue data with them. Most pest control
        companies never do this, and then wonder why their agency optimizes for
        the wrong thing.
      </p>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4">
        Set up a feedback loop
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        Things change when your agency knows which campaigns produce customers,
        not just calls. When they can see that Campaign A generates cheap leads
        that don&apos;t close and Campaign B generates pricier leads that close
        at 25%, they&apos;ll shift budget to Campaign B on their own. They want
        to produce results. They just need the data to know what
        &ldquo;results&rdquo; looks like on your end.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Schedule a monthly review where you share closed revenue by lead source.
        Make it a standing meeting. You&apos;ll be surprised how quickly it
        starts paying for itself.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        The bigger picture: closed-loop attribution
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        Everything above can be done manually. Spreadsheets, call listening, and
        monthly meetings will get you 80% of the way there. But it&apos;s slow
        work, and it depends on your team consistently dispositioning every call
        correctly.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        The ideal state is what marketers call &ldquo;closed-loop
        attribution&rdquo;: an unbroken data trail from ad click to phone call
        to what the rep said to whether the deal closed to the actual revenue
        amount. When you have that, you&apos;re not guessing about marketing
        ROI. You&apos;re measuring it in real time.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        This is what Plaibook does. It connects the buyer journey from ad click
        to call to closed deal to revenue. So when you sit down with your
        agency, you can show them which campaigns produce paying customers and
        which ones just produce noise.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        But whether you use Plaibook, build something custom, or run it on
        spreadsheets, the principle is the same: stop measuring marketing on
        lead volume. Start measuring it on revenue. That&apos;s the only number
        that pays the bills.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-12 mb-6">
        What to do this week
      </h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        You don&apos;t need to overhaul everything at once. Here&apos;s where
        to start:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-text-secondary mb-6">
        <li>
          <strong>Pull your last three months of agency reports.</strong> Count
          the total &ldquo;leads&rdquo; reported. Then look at your CRM or
          customer records. How many new customers did you actually add in those
          months? Divide your total marketing spend by new customers. That&apos;s
          your real cost per acquisition.
        </li>
        <li>
          <strong>Listen to 20 random calls from last month</strong> that your
          agency counted as leads. Categorize each one: new prospect, existing
          customer, wrong number, junk, no answer. This alone will tell you how
          accurate the lead count is.
        </li>
        <li>
          <strong>Email your agency</strong> with your findings and ask to set up
          a call to align on lead definitions and reporting going forward.
          Remember: collaborative, not combative.
        </li>
        <li>
          <strong>Start dispositioning calls.</strong> Even if it&apos;s basic
          (booked / not booked / existing customer / junk), start tracking
          outcomes today. You&apos;ll thank yourself in 90 days.
        </li>
      </ol>
      <p className="text-text-secondary leading-relaxed mb-4">
        Your marketing agency might be doing a great job. They might be inflating
        numbers. They might be somewhere in between. The point is: you should
        know. And right now, if you&apos;re like most pest control companies,
        you don&apos;t.
      </p>
      <p className="text-text-secondary leading-relaxed mb-4">
        Once you can see what&apos;s actually working, the budget decisions
        get a lot easier.
      </p>
    </>
  );
}
